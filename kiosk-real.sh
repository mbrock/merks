#!/usr/bin/env bash
xset -dpms
xset s off
xset s noblank
unclutter &

until $(curl --output /dev/null --silent --head --fail https://merksmajas.lv); do
  printf "."
  sleep 1
done

xrandr --output DP-1 --mode 1920x1080

echo ok
sleep 2
chromium-browser /home/kiosk/merks/kiosk.html --window-size=1920x1080 --window-position=0,0 \
  --kiosk \
  --incognito --noerrdialogs --disable-translate \
  --disable-pinch \
  --overscroll-history-navigation=0 \
  --no-first-run --fast --fast-start --disable-infobars \
  --disable-web-security --user-data-dir -test-type --disable-site-isolation-trials \
  --force-device-scale-factor=2 \
  --disable-features=TranslateUI > chrome.log 2>&1
