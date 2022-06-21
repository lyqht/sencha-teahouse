<div align='center'>
  <img width='200' src='./logo.png' />
</div>

# Sencha Teahouse

This project is created with the template as such
```
npx react-native init --template react-native-template-typscript
```

This app intends to be a shopping app for buying tea and sweets from Sencha Teahouse. 

It explores the use of: 
- GraphCMS
- Zustand for state management
- Adding Expo-Cli to a bare RN project
  - the code with expo modules are in the branch `/add-expo`
  - basically this is so that I can upload a snack every iteration for sharing with others.
- Async Storage for locally stored items (TODO)
- Supertokens for Auth (TODO, pending RN SDK to be up)
- Some animation library (TODO)

This app is created for some of my [exercise submissions for Centauri React Cohort](https://github.com/lyqht/centauri-react-native).
## Snacks

- [v01](https://snack.expo.dev/@lyqht/sencha-teahouse-v01)
  - Retrieve products data from GraphCMS and render them on home page
- [v02](https://snack.expo.dev/@lyqht/sencha-teahouse-v2)
  -  Added checkout button with badge that shows number of items in cart
  -  Added checkout page to show total price & all items in cart
  -  Added listfootercomponent to show end of list