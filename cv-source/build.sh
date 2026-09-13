#!/bin/sh
# Regenerates public/cv-en.pdf and public/cv-it.pdf from the HTML sources in this folder.
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$DIR/../public/cv-en.pdf" --no-sandbox "file://$DIR/en.html"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$DIR/../public/cv-it.pdf" --no-sandbox "file://$DIR/it.html"

echo "Generated public/cv-en.pdf and public/cv-it.pdf"
