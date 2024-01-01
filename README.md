# Ordinals SNS Validation Overview
1. The library helps to validate sns ordinals inscriptions.
2. Has both Typescript and Javascript support. Use import for Typescript projects and use require for javascript only projects.
3. Library supports all SNS inscriptions like satsnames, btc, bitmap, bitter and so on.
4. Library checks for special characters, invisible characters, arabic characters and produces the output.

**Using the library:**
1. Import the library and call the function validateInscription.
2. validateInscription accepts two parameters. First Parameter is sns inscription name and second parameter (isArabic) is optional, but by default is true. Pass parameter as false in-case if arabic validation is not required.
3. Out result has 3 parameters
     1. isInscriptionValid - True if inscription does not contain any hidden unicode characters/spaces/dot in the inscription name. True means there is no issue in inscription name.
     2. type - If inscription name has only digits  - "digits" will be the output. If inscription name has only letters - "letters" will be the output.  If inscription name is alpha numeric - "alphaNumeric" will be the output. If inscription name has special character or symbols or other language letters - "special" will be the output.
     3. hasArabic - If inscription name has arabic character - the property will be true. If arabic parameter is false while calling function, this property will be ignored.
     4. **Sample result**: { isInscriptionInvalid: false, type: 'letters', hasArabic: false }
  

