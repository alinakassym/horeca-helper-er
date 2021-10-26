# Horeca Helper Employer

## Figma Draft
- [Draft](https://www.figma.com/file/NnEt3gAKscuFw7sF3XAQM3/HorecaHelper?node-id=0%3A1)

## Project setup

```
git clone git@gitlab.com:altyn-jazba/horeca-helper/horeca-helper-er.git
cd horeca-helper-er
npm install
npx react-native link
# for ios:
cd ios && pod install && cd ../
```
## Run project with emulator
```bash
npm run android
```
### or
```
npx react-native run-android
npx react-native run-ios
```

## Run project on android device

### via cable:
1. Go to -> Settings -> About Device -> Software Info -> Build Number
2. Tap (Click) multiple times on Build Number to Enable Developer Options (Developer Options will be visible in your Settings)
3. Go inside the Developer Options and Enable USB Debugging Mode.
4. Type:
```bash
adb devices
```
Output:
```
List of devices attached
4ae486fe        device
```
5. Forward requests from your device
```bash
adb reverse tcp:3000 tcp:3000
```
7. Run project
```bash
npm run android
```


# Backend bringup

## Database
```bash
cd path/to/horeca-helper
git clone https://gitlab.com/altyn-jazba/horeca-helper/horeca-helper-db.git
cd horeca-helper-db
docker-compose down
rm -rf volumes/hh-db
docker-compose up
```

## Nest.js app
```bash
# first time only
cd path/to/horeca-helper
git clone https://gitlab.com/altyn-jazba/horeca-helper/horeca-helper-backend.git

# every time
cd horeca-helper-backend
rm -rf dist
npm i
npm run build
npx typeorm migration:run
# first run to generate tables (wait until you see "Nest application successfully started" then hit Ctrl+C, takes about ~30s); won't have to do this once all db changes are in the migrations
npm run start
npx typeorm migration:run -c seed
npm run start
```

## Test that it worked
- Open http://localhost:3000/or in browser: should get "Welcome to /or root!"
- Open http://localhost:3000/er in browser: should get "Welcome to /er root!"
- Open http://localhost:3000/ee in browser: should get "Welcome to /ee root!"
