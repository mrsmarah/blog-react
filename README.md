# BLOG APP

## Author:
- Marah Joudeh

### LINKS:

- [heruko-app /API](https://api-marah.herokuapp.com)
- [Netlify-app](https://marah-blog.netlify.app/)


### APIs

- `/signup`:
  * POST: send username and password 
- `/signin`
  * POST: send username and password with basic authentication

- `/blog`:
  * POST: add a new blog 
- `/blogs`
  * GET: get all blogs 
- `/stories/:blog`
  * GET: get stories of a certain blog
- `/story/:id`
  * GET: get one story
- `/addToStory/:id`
  * POST: add content to story
- `/newStory/:username`
  * POST: add new story

- `/statusAll`
  * GET: get all stories for admin only
- `/status/:id`
  * GET: get one story for admin only
- `/status/:id`
  * PUT: edit one story for admin only


### How to run ?

- Server : `nodemon`
- React app : `npm start`
