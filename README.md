# Autofeed Commander

A management panel for multiple
[autofeed-backend](https://github.com/starlightautomation/autofeed-backend)
instances.

---

1. [Screenshots](#screenshots)
2. [About](#about)
3. [Installation](#installation)
   1. [Docker](#docker)
   2. [No Docker](#no-docker)
4. [Autofeed Backend Support](#autofeed-backend-support)

---

### About

Autofeed Commander is a management panel to control multiple autofeed-backend
instances from one UI. This is a simple NuxtJS application that stores configuration
data in local storage. Since autofeed-backend is an unauthenticated API, all that is
needed to connect is the instance address and port.

### Screenshots
![Dashboard](./.github/screenshot-dashboard.png)

![Add Instance](./.github/screenshot-add-instance.png)

![Control Instance](./.github/screenshot-instance.png)
 
---

# Installation

## Docker

```
docker pull ghcr.io/StarlightAutomation/autofeed-commander:latest
```
or, specify a version:
```
docker pull ghcr.io/Starlightautomation/autofeed-commander:0.1.0
```

Next, start the container:
```
docker run -it \
  -p '3000:3000' \ # Port binding, container port 3000/host port 3000
  autofeed-commander \
  yarn start
```

Your instance will now be accessible at `http://localhost:3000`.

## No Docker

**Install Dependencies**
```
yarn install
```

**Build Application**
```
yarn build
```

**Start Application**
```
yarn start
```

Your instance will now be accessible at `http://localhost:3000`.

---

## Autofeed Backend Support
Due to default CORS policy, [autofeed-backend](https://github.com/starlightautomation/autofeed-backend)
version `0.5.2` or higher is required. This version adds `*` to allowed origins,
thus getting around the default CORS policy.

If your autofeed backend instances are exposed publicly, you should not allow
all origins. If this is an issue for you, please open an issue on the `autofeed-backend`
repository. Autofeed Backend is intended to be run internally, and is an
unauthenticated application. Autofeed Commander is built in the same way and
should not be exposed to public networks.
