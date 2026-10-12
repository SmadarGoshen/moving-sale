param(
  [string]$Source = 'products pictures',
  [string]$Destination = 'assets/images',
  [int]$MaxSide = 1400,
  [int]$Quality = 78
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$sourcePath = (Resolve-Path $Source).Path
$destinationPath = Join-Path (Get-Location).Path $Destination
New-Item -ItemType Directory -Force -Path $destinationPath | Out-Null

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' } |
  Select-Object -First 1
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$settings = [System.Drawing.Imaging.EncoderParameters]::new(1)
$settings.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new($encoder, [long]$Quality)
$manifest = [ordered]@{}

Get-ChildItem -LiteralPath $sourcePath -Directory | Sort-Object Name | ForEach-Object {
  $folder = $_
  $slug = ($folder.Name.ToLowerInvariant() -replace '[^a-z0-9]+', '-').Trim('-')
  $files = @(Get-ChildItem -LiteralPath $folder.FullName -File |
    Where-Object { $_.Extension -match '^\.(jpe?g|png)$' } |
    Sort-Object Name)
  $outputs = @()
  for ($i = 0; $i -lt $files.Count; $i++) {
    $photo = [System.Drawing.Image]::FromFile($files[$i].FullName)
    try {
      if ($photo.PropertyIdList -contains 274) {
        $orientation = $photo.GetPropertyItem(274).Value[0]
        switch ($orientation) {
          3 { $photo.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
          6 { $photo.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
          8 { $photo.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
        }
      }
      $ratio = [Math]::Min(1.0, $MaxSide / [double][Math]::Max($photo.Width, $photo.Height))
      $width = [Math]::Max(1, [int][Math]::Round($photo.Width * $ratio))
      $height = [Math]::Max(1, [int][Math]::Round($photo.Height * $ratio))
      $bitmap = [System.Drawing.Bitmap]::new($width, $height)
      try {
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        try {
          $graphics.Clear([System.Drawing.Color]::White)
          $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
          $graphics.DrawImage($photo, 0, 0, $width, $height)
        } finally { $graphics.Dispose() }
        $name = '{0}-{1:d2}.jpg' -f $slug, ($i + 1)
        $path = Join-Path $destinationPath $name
        $bitmap.Save($path, $jpegCodec, $settings)
        $outputs += "assets/images/$name"
      } finally { $bitmap.Dispose() }
    } finally { $photo.Dispose() }
  }
  $manifest[$folder.Name] = $outputs
}

$manifest | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $destinationPath 'manifest.json') -Encoding UTF8
Write-Output "Prepared $(@($manifest.Values | ForEach-Object { $_ }).Count) photos in $destinationPath"
