# Web base
FROM nginx:mainline AS web-base

# Bash
SHELL [ "/bin/bash", "-c" ]


# Web dev
FROM web-base AS web-dev

# Expose port
EXPOSE 80

# Copy to configration
COPY ./web/dev/nginx.conf /etc/nginx/nginx.conf
COPY ./web/dev/conf/ /etc/nginx/conf/


# Web prod
FROM web-base AS web-prod

# Expose port
EXPOSE 443

# Copy to configration
COPY ./web/prod/nginx.conf /etc/nginx/nginx.conf
COPY ./web/prod/conf/ /etc/nginx/conf/



# App base
FROM node:22.8-slim AS app-base

# Bash
SHELL [ "/bin/bash", "-c" ]

# update npm latest version
RUN npm install -g npm@latest


# App Dev
FROM app-base AS app-dev

# User args
ARG UID=2000
ARG GID=2000
ARG USER=user
ARG GROUP=user

# Expose port
EXPOSE 5200

# Vite environment
ENV CHOKIDAR_USEPOLLING=true

# Create user
RUN groupadd -g ${GID} ${GROUP} && useradd -m -s /bin/bash -u ${UID} -g ${GID} ${USER}

# Change user
USER ${USER}

# Set workdir
WORKDIR /var/app

# Copy to package.json and package-lock.json
COPY --chown=${USER}:${GROUP} ./npm/package.json /var/app/package.json
COPY --chown=${USER}:${GROUP} ./npm/package-lock.json /var/app/package-lock.json

# Install dependencies
RUN npm ci