# Ghost Coding Challenge
 A new standalone app that represents a single article page, and allows someone to submit comments and replies-to-comments, as well as upvote any comments they like. 

## V1
This is the first version of the app - an MVP. It is kept simplistic on purpose. 

### Frontend
The front end is plain VanillaJS with no dependencies. The only remote asset is the inter font. In case it isn't reachable during runtime, fallback fonts have been specified in CSS. 

It consists of 3 files: index.html, styles.css, and controller.mjs. 

#### index.html
The index.html file contains the markup for the UI. It makes use of HTML template tag in order to reuse markup for the messages. CSS classes on styled elements adhere to the BEM syntax.

#### styles.css
The styles.css files hold the styling of the markup. A few handfuls of CSS variables have been defined as design tokens loosely based on the Figma design. 

#### controller.mjs
The controller.mjs file contains the logic for the UI. The code is plain ES6 with no dependencies kept at a bare minimum.