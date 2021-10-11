# Horeca Helper Employer

## Figma Draft
- [Draft](https://www.figma.com/file/NnEt3gAKscuFw7sF3XAQM3/HorecaHelper?node-id=0%3A1)

## Project setup

```
git clone git@gitlab.com:altyn-jazba/horeca-helper/horeca-helper-er.git
cd horeca-helper-er
npm install
react-native link
```
## Run project with emulator
```
npm run android
```
### or
```
react-native run-android
react-native run-ios
```

## Run project on android device

### via cable:
1. Go to -> Settings -> About Device -> Software Info -> Build Number
2. Tap (Click) multiple times on Build Number to Enable Developer Options (Developer Options will be visible in your Settings)
3. Go inside the Developer Options and Enable USB Debugging Mode.
4. Type:
```
adb devices
```
Output:
```
List of devices attached
4ae486fe        device
```
5. Forward requests from your device
```
adb reverse tcp:8080 tcp:8080
```
7. Run project
```
npm run android
```
