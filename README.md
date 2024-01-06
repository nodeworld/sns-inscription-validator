# Ordinals SNS Validation Overview
1. The library helps to validate sns ordinals inscriptions.
2. Has both Typescript and Javascript support. Use import for Typescript projects and use require for javascript only projects.
3. Library supports all SNS inscriptions like satsnames, btc, bitmap, bitter and so on.
4. Library checks for special characters, invisible characters, arabic characters and produces the output.

**Using the library:**
1. Import the library and call the function validateInscription.
2. validateInscription accepts two parameters. First Parameter is sns inscription name and second parameter (isArabic) is optional, but by default is true. Pass parameter as false in-case if arabic validation is not required.
3. Output result has 3 parameters
     1. isInscriptionValid - True if inscription does not contain any hidden unicode characters/spaces/dot in the inscription name. True means there is no issue in inscription name.
     2. type - If inscription name has only digits  - "digits" will be the output. If inscription name has only letters - "letters" will be the output.  If inscription name is alpha numeric - "alphaNumeric" will be the output. If inscription name has special character or symbols or other language letters - "special" will be the output.
     3. hasArabic - If inscription name has arabic character - the property will be true. If arabic parameter is false while calling function, this property will be ignored.
     4. **Sample result**: { isInscriptionInvalid: false, type: 'letters', hasArabic: false }
  
**Typescript users:**
import { validateInscription } from 'sns-inscription-validator';

Inside your function, call - validateInscription('name.sats');

**Javascript Users:**
const {validateInscription} = require('sns-inscription-validator');
Inside your function, call - validateInscription('name.sats');

**Invalid satsnames:**
1. If '.' is found in snsnames, it is invalid (Eg: name.sats is valid, but a.name.sats is invalid)
2. If space is found in snsnames, it is invalid (Eg: "firstname lastname.sats" is invalid)
3. If there are any invalid unicodes found in snsnames, it is invalid. Zero width characters or invisble characters are considered as invalid as it will mislead the buyers. For more information on invisible unicode characters, please browse on invisible unicode characters.


Please note, this library will not validate rare sats like uncommon, vintage etc. if snsnames are inscribed on raresats. Will rollout this feature based on response for this library.

_UFE0F & UFE0E unicodes are variation selectors. BestInSlot platform shows these unicodes as invalid, but these unicodes are not invisible characters and hence it is treated as valid in this library._