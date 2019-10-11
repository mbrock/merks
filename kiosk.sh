#!/bin/sh
set +ex
chromium-browser \
  --disable-web-security \
  -test-type \
  --user-data-dir \
  --incognito \
  --disable-site-isolation-trials \
  ./kiosk.html
