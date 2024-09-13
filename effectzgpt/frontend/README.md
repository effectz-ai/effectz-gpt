This is a [LlamaIndex](https://www.llamaindex.ai/) project using [Next.js](https://nextjs.org/) bootstrapped with [`create-llama`](https://github.com/run-llama/LlamaIndexTS/tree/main/packages/create-llama).

## Getting Started

First, install the dependencies:

```
npm install
```

Second, generate the embeddings of the documents in the `./data` directory (if this folder exists - otherwise, skip this step):

```
npm run generate
```

Third, run the development server:

```

npm run dev
```

To run in production
```
npm run build
nohup npm run start > output.log 2>&1 &
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Using Docker

1. Build an image for the Next.js app:

```
docker build -t <your_app_image_name> .
```

2. Generate embeddings:

Parse the data and generate the vector embeddings if the `./data` folder exists - otherwise, skip this step:

```
docker run \
  --rm \
  -v $(pwd)/.env:/app/.env \ # Use ENV variables and configuration from your file-system
  -v $(pwd)/config:/app/config \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/cache:/app/cache \ # Use your file system to store the vector database
  <your_app_image_name> \
  npm run generate
```

3. Start the app:

```
docker run \
  --rm \
  -v $(pwd)/.env:/app/.env \ # Use ENV variables and configuration from your file-system
  -v $(pwd)/config:/app/config \
  -v $(pwd)/cache:/app/cache \ # Use your file system to store gea vector database
  -p 3000:3000 \
  <your_app_image_name>
```
## Admin panel
Admin panel is accessible for users who has admin privileges on `/admin` Route.
![Dashboard](https://github.com/effectz-ai/effectz-gpt/blob/feat/auth/effectzgpt/frontend/dashboard.png)

![Admin Panel](https://github.com/effectz-ai/effectz-gpt/blob/feat/auth/effectzgpt/frontend/Admin.png)

## Authentication

Populate the .env file with your firebase project credentials an run the application.
If you need to override authentication for Development purposes check the route and commentout the `<ProtectedRoute>`
component.

If you need to protect any route wrap the component with `<ProtectedRoute>`

## Learn More

NOTE:  for NEXT_PUBLIC_CHAT_API use public ip of the backend server and make sure the port is open

NOTE: If you are using Speech recognition please use use supported browser (Google Chrome, Safari)

To learn more about LlamaIndex, take a look at the following resources:

- [LlamaIndex Documentation](https://docs.llamaindex.ai) - learn about LlamaIndex (Python features).
- [LlamaIndexTS Documentation](https://ts.llamaindex.ai) - learn about LlamaIndex (Typescript features).

You can check out [the LlamaIndexTS GitHub repository](https://github.com/run-llama/LlamaIndexTS) - your feedback and contributions are welcome!
