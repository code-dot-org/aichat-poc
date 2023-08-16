This is **purely** for internal use only and will go away soon. Don't read anything into it or make any assumptions.

So, first of all - the code. As I've said a few times, this is a lot of fast iteration. So if something looks sloppy or incorrectly implemented, it probably is! If something seems like it might be right, please just ping me and ask - I'll let you know if it's clever or a hack. :-)

No types either.

redux is in the store library, and it's roughed out modern reduxjs-toolkit.

components has the react bits, and the app route is page.js outside of components.

the api directory has all of the backend api routes, which are probably not super useful going forward since it'd take effort to port those to RoR and change the storage away from mongo. But maybe it's worth reading through. The FE just hits rest end points through rtk query so it doesn't really care how it's implemented only how the IO is formatted.

login is just with a user name, no password. POC.

setup isn't awful. it's a next.js app so startup is standard:

```
npm install
npm run dev
```

That'll start it on `http://localhost:3001`

But...you also need a mongodb instance running.

In the root, copy `env.default` to `.env.local` and fill in the values.

Most important things you'll need are the `MONGO_USER` and `MONGO_PASS`, as well as completing the rest of the `MONGO_URL`.

You can run mongo locally or just set up a free account on atlas @ https://www.mongodb.com. The free tier is perfectly fine for these purposes, and then it'll give you the connection params to fill in the environment variables. Presumably we won't use mongo when we go live, it was just fast and easy to work with for POC purposes.

`AICHAT_KEY` is the key from your openai account, so set up a token there and snag it.

Finally, you'll need to populate some data. There are two scripts in the data_generators folder - one will populate a bunch of random users and the second will populate a bunch of random classrooms. The names are all made up (I found a random name generator), so you can keep them or swap in something else.

Those scripts will just spit out a bunch of curl commands. So you can start up the server with `npm run dev`, then run the scripts to generate the curl commands and paste them into a terminal and it'll populate the data for you. Just make sure mongo is up first, and otherwise there are no security concerns for it. If you deploy this app elsewhere, you'd need to lock things down first - at a minimum in the `user/route.js` file, uncomment the lines that require a logged in admin session to create new users.

On the running app, just hit the login button in the upper right and type in one of the user names to interact.

As a student, you can choose a bot and chat. As a teacher, you can choose a classroom, see the chats that are active (most recent chat), and unlock a locked student who submitted something they shouldn't have.

Also, honestly, if it's too much of a headache getting it running locally and you want to try it out, I'll re-configure it to deploy to my personal vercel account so it's available that way.
