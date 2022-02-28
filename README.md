# Bypass twitter login wall

A web extension that removes the twitter login wall.

<div style="display: flex; flex-wrap: wrap;">
    <div style="flex: 1; margin-right: 10px; margin-bottom: 10px;">
        <h6>Without extension</h6>
        <img style="width: 100%; min-width: 250px;" src="screenshots/Before.png" alt="Twitter without extension"/>
    </div>
    <div style="flex: 1;">
        <h6>With extension</h6>
        <img style="width: 100%; min-width: 250px;" src="screenshots/After.png" alt="Twitter with extension"/>
    </div>
</div>

## Development

Before developing, install node LTS and yarn.

Then run

```sh
yarn
yarn start

# In a new terminal tab run
yarn start:firefox
# or
yarn start:chrome
```

## Build

Run a build using

```sh
yarn build
```

This will output a production build in `dist` and a `.zip` file ready for submission.
