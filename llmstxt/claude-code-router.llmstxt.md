================
CODE SNIPPETS
================

TITLE: Configuration File Example
DESCRIPTION: Example structure for the Claude Code router configuration file.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/CLAUDE.md#_snippet_4>

LANGUAGE: json
CODE:

```
{
  "providers": {
    "openai": {
      "apiKey": "YOUR_OPENAI_API_KEY"
    }
  },
  "routes": {
    "default": {
      "provider": "openai",
      "model": "gpt-3.5-turbo"
    }
  }
}
```

--------------------------------

TITLE: Install Claude Code
DESCRIPTION: Command to install the Claude Code package globally using npm.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/en/project-motivation-and-how-it-works.md#_snippet_0>

LANGUAGE: bash
CODE:

```
npm install -g @anthropic-ai/claude-code
```

--------------------------------

TITLE: Install Claude Code
DESCRIPTION: Command to globally install the Claude Code package using npm.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/zh/项目初衷及原理.md#_snippet_0>

LANGUAGE: bash
CODE:

```
npm install -g @anthropic-ai/claude-code
```

--------------------------------

TITLE: Claude Code Router Configuration Example
DESCRIPTION: A comprehensive example of the `config.json` file for Claude Code Router, demonstrating settings for API keys, proxy URLs, logging, timeouts, non-interactive mode, and various model providers with their respective configurations and transformers.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README_zh.md#_snippet_0>

LANGUAGE: json
CODE:

```
{
  "APIKEY": "your-secret-key",
  "PROXY_URL": "http://127.0.0.1:7890",
  "LOG": true,
  "API_TIMEOUT_MS": 600000,
  "NON_INTERACTIVE_MODE": false,
  "Providers": [
    {
      "name": "openrouter",
      "api_base_url": "https://openrouter.ai/api/v1/chat/completions",
      "api_key": "sk-xxx",
      "models": [
        "google/gemini-2.5-pro-preview",
        "anthropic/claude-sonnet-4",
        "anthropic/claude-3.5-sonnet",
        "anthropic/claude-3.7-sonnet:thinking"
      ],
      "transformer": {
        "use": ["openrouter"]
      }
    },
    {
      "name": "deepseek",
      "api_base_url": "https://api.deepseek.com/chat/completions",
      "api_key": "sk-xxx",
      "models": ["deepseek-chat", "deepseek-reasoner"],
      "transformer": {
        "use": ["deepseek"],
        "deepseek-chat": {
          "use": ["tooluse"]
        }
      }
    },
    {
      "name": "ollama",
      "api_base_url": "http://localhost:11434/v1/chat/completions",
      "api_key": "ollama",
      "models": ["qwen2.5-coder:latest"]
    },
    {
      "name": "gemini",
      "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
      "api_key": "sk-xxx",
      "models": ["gemini-2.5-flash", "gemini-2.5-pro"],
      "transformer": {
        "use": ["gemini"]
      }
    },
    {
      "name": "volcengine",
      "api_base_url": "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
      "api_key": "sk-xxx",
      "models": ["deepseek-v3-250324", "deepseek-r1-250528"],
      "transformer": {
        "use": ["deepseek"]
      }
    },
    {
      "name": "modelscope",
      "api_base_url": "https://api-inference.modelscope.cn/v1/chat/completions",
      "api_key": "",
      "models": ["Qwen/Qwen3-Coder-480B-A35B-Instruct", "Qwen/Qwen3-235B-A22B-Thinking-2507"],
      "transformer": {
        "use": [
          [
            "maxtoken",
            {
              "max_tokens": 65536
            }
          ],
          "enhancetool"
        ],
        "Qwen/Qwen3-235B-A22B-Thinking-2507": {
          "use": ["reasoning"]
        }
      }
    },
    {
      "name": "dashscope",
      "api_base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      "api_key": "",
      "models": ["qwen3-coder-plus"],
      "transformer": {
        "use": [
          [
            "maxtoken",
            {
              "max_tokens": 65536
            }
          ],
          "enhancetool"
        ]
      }
    },
    {
      "name": "aihubmix",
      "api_base_url": "https://aihubmix.com/v1/chat/completions",
      "api_key": "sk-",
      "models": [
        "Z/glm-4.5",
        "claude-opus-4-20250514",
        "gemini-2.5-pro"
      ]
    }
  ],
  "Router": {
    "default": "deepseek,deepseek-chat",
    "background": "ollama,qwen2.5-coder:latest",
    "think": "deepseek,deepseek-reasoner",
    "longContext": "openrouter,google/gemini-2.5-pro-preview",
    "longContextThreshold": 60000,
    "webSearch": "gemini,gemini-2.5-flash"
  }
}
```

--------------------------------

TITLE: Comprehensive Claude Code Router Configuration Example
DESCRIPTION: A detailed example of a config.json file showcasing various providers (OpenRouter, Deepseek, Ollama, Gemini, Volcengine, ModelScope, Dashscope, AIHubMix) with their respective API base URLs, models, and transformer configurations. It also includes router settings for default, background, think, long context, and web search functionalities.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_3>

LANGUAGE: json
CODE:

```
{
  "APIKEY": "your-secret-key",
  "PROXY_URL": "http://127.0.0.1:7890",
  "LOG": true,
  "API_TIMEOUT_MS": 600000,
  "NON_INTERACTIVE_MODE": false,
  "Providers": [
    {
      "name": "openrouter",
      "api_base_url": "https://openrouter.ai/api/v1/chat/completions",
      "api_key": "sk-xxx",
      "models": [
        "google/gemini-2.5-pro-preview",
        "anthropic/claude-sonnet-4",
        "anthropic/claude-3.5-sonnet",
        "anthropic/claude-3.7-sonnet:thinking"
      ],
      "transformer": {
        "use": ["openrouter"]
      }
    },
    {
      "name": "deepseek",
      "api_base_url": "https://api.deepseek.com/chat/completions",
      "api_key": "sk-xxx",
      "models": ["deepseek-chat", "deepseek-reasoner"],
      "transformer": {
        "use": ["deepseek"],
        "deepseek-chat": {
          "use": ["tooluse"]
        }
      }
    },
    {
      "name": "ollama",
      "api_base_url": "http://localhost:11434/v1/chat/completions",
      "api_key": "ollama",
      "models": ["qwen2.5-coder:latest"]
    },
    {
      "name": "gemini",
      "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
      "api_key": "sk-xxx",
      "models": ["gemini-2.5-flash", "gemini-2.5-pro"],
      "transformer": {
        "use": ["gemini"]
      }
    },
    {
      "name": "volcengine",
      "api_base_url": "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
      "api_key": "sk-xxx",
      "models": ["deepseek-v3-250324", "deepseek-r1-250528"],
      "transformer": {
        "use": ["deepseek"]
      }
    },
    {
      "name": "modelscope",
      "api_base_url": "https://api-inference.modelscope.cn/v1/chat/completions",
      "api_key": "",
      "models": ["Qwen/Qwen3-Coder-480B-A35B-Instruct", "Qwen/Qwen3-235B-A22B-Thinking-2507"],
      "transformer": {
        "use": [
          [
            "maxtoken",
            {
              "max_tokens": 65536
            }
          ],
          "enhancetool"
        ],
        "Qwen/Qwen3-235B-A22B-Thinking-2507": {
          "use": ["reasoning"]
        }
      }
    },
    {
      "name": "dashscope",
      "api_base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      "api_key": "",
      "models": ["qwen3-coder-plus"],
      "transformer": {
        "use": [
          [
            "maxtoken",
            {
              "max_tokens": 65536
            }
          ],
          "enhancetool"
        ]
      }
    },
    {
      "name": "aihubmix",
      "api_base_url": "https://aihubmix.com/v1/chat/completions",
      "api_key": "sk-",
      "models": [
        "Z/glm-4.5",
        "claude-opus-4-20250514",
        "gemini-2.5-pro"
      ]
    }
  ],
  "Router": {
    "default": "deepseek,deepseek-chat",
    "background": "ollama,qwen2.5-coder:latest",
    "think": "deepseek,deepseek-reasoner",
    "longContext": "openrouter,google/gemini-2.5-pro-preview",
    "longContextThreshold": 60000,
    "webSearch": "gemini,gemini-2.5-flash"
  }
}
```

--------------------------------

TITLE: Install Claude Code Router
DESCRIPTION: Installs the Claude Code Router package globally using npm. This command assumes Node.js and npm are already installed.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_0>

LANGUAGE: shell
CODE:

```
npm install -g @musistudio/claude-code-router
```

--------------------------------

TITLE: Custom Router Implementation Example
DESCRIPTION: An example JavaScript module for a custom router. It receives the request and config objects, analyzes the user message, and returns a provider-model string or null for fallback.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_17>

LANGUAGE: javascript
CODE:

```
// /User/xxx/.claude-code-router/custom-router.js

/**
 * A custom router function to determine which model to use based on the request.
 *
 * @param {object} req - The request object from Claude Code, containing the request body.
 * @param {object} config - The application's config object.
 * @returns {Promise<string|null>} - A promise that resolves to the "provider,model_name" string, or null to use the default router.
 */
module.exports = async function router(req, config) {
  const userMessage = req.body.messages.find((m) => m.role === "user")?.content;

  if (userMessage && userMessage.includes("explain this code")) {
    // Use a powerful model for code explanation
    return "openrouter,anthropic/claude-3.5-sonnet";
  }

  // Fallback to the default router configuration
  return null;
};
```

--------------------------------

TITLE: OpenRouter Provider Routing Example
DESCRIPTION: An example of using the 'openrouter' transformer with provider routing to specify underlying providers.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_9>

LANGUAGE: json
CODE:

```
  "transformer": {
    "use": ["openrouter"],
    "moonshotai/kimi-k2": {
      "use": [
        [
          "openrouter",
          {
            "provider": {
              "only": ["moonshotai/fp8"]
            }
          }
        ]
      ]
    }
  }
```

--------------------------------

TITLE: GitHub Actions Workflow for Claude Code Router
DESCRIPTION: This snippet shows a complete GitHub Actions workflow file (`.github/workflows/claude.yaml`) to integrate the Claude Code Router. It covers setting up the environment, starting the router, and using the `claude-code-action`.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_19>

LANGUAGE: yaml
CODE:

```
name: Claude Code

on:
  issue_comment:
    types: [created]
  # ... other triggers

jobs:
  claude:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      # ... other conditions
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1

      - name: Prepare Environment
        run: |
          curl -fsSL https://bun.sh/install | bash
          mkdir -p $HOME/.claude-code-router
          cat << 'EOF' > $HOME/.claude-code-router/config.json
          {
            "log": true,
            "NON_INTERACTIVE_MODE": true,
            "OPENAI_API_KEY": "${{ secrets.OPENAI_API_KEY }}",
            "OPENAI_BASE_URL": "https://api.deepseek.com",
            "OPENAI_MODEL": "deepseek-chat"
          }
          EOF
        shell: bash

      - name: Start Claude Code Router
        run: |
          nohup ~/.bun/bin/bunx @musistudio/claude-code-router@1.0.8 start &
        shell: bash

      - name: Run Claude Code
        id: claude
        uses: anthropics/claude-code-action@beta
        env:
          ANTHROPIC_BASE_URL: http://localhost:3456
        with:
          anthropic_api_key: "any-string-is-ok"

```

--------------------------------

TITLE: Environment Preparation Script
DESCRIPTION: This bash script prepares the GitHub Actions runner environment by installing Bun, creating a directory for the router configuration, and setting up the `config.json` file with necessary API keys and settings.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_20>

LANGUAGE: bash
CODE:

```
curl -fsSL https://bun.sh/install | bash
mkdir -p $HOME/.claude-code-router
cat << 'EOF' > $HOME/.claude-code-router/config.json
{
  "log": true,
  "NON_INTERACTIVE_MODE": true,
  "OPENAI_API_KEY": "${{ secrets.OPENAI_API_KEY }}",
  "OPENAI_BASE_URL": "https://api.deepseek.com",
  "OPENAI_MODEL": "deepseek-chat"
}
EOF
```

--------------------------------

TITLE: Running Claude Code Router
DESCRIPTION: Instructions on how to start the Claude Code Router service using the command line interface. It also includes the command to restart the service after configuration changes.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_4>

LANGUAGE: shell
CODE:

```
ccr code
```

LANGUAGE: shell
CODE:

```
ccr restart
```

--------------------------------

TITLE: Custom Router JavaScript Example
DESCRIPTION: An example JavaScript module for a custom router. It exports an async function that determines the model based on the request and returns 'provider,model_name' or null for default routing.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README_zh.md#_snippet_10>

LANGUAGE: javascript
CODE:

```
// /User/xxx/.claude-code-router/custom-router.js

/**
 * A custom routing function to determine which model to use based on the request.
 *
 * @param {object} req - The request object from Claude Code, containing the request body.
 * @param {object} config - The application's configuration object.
 * @returns {Promise<string|null>} - A Promise resolving to a "provider,model_name" string, or null to fall back to default routing.
 */
module.exports = async function router(req, config) {
  const userMessage = req.body.messages.find(m => m.role === 'user')?.content;

  if (userMessage && userMessage.includes('explain this code')) {
    // Use a more powerful model for code explanation tasks
    return 'openrouter,anthropic/claude-3.5-sonnet';
  }

  // Fallback to default routing configuration
  return null;
};
```

--------------------------------

TITLE: Starting the Claude Code Router Service
DESCRIPTION: This bash command starts the Claude Code Router as a background process using `nohup` and `bunx`, ensuring it continues to run even if the main workflow step is interrupted.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_21>

LANGUAGE: bash
CODE:

```
nohup ~/.bun/bin/bunx @musistudio/claude-code-router@1.0.8 start &
```

--------------------------------

TITLE: Router Server Commands
DESCRIPTION: Commands to manage the Claude Code router server, including starting, stopping, and checking its status.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/CLAUDE.md#_snippet_1>

LANGUAGE: bash
CODE:

```
ccr start
```

LANGUAGE: bash
CODE:

```
ccr stop
```

LANGUAGE: bash
CODE:

```
ccr status
```

--------------------------------

TITLE: Claude Code Router Configuration
DESCRIPTION: Example configuration for Claude Code Router, detailing settings for proxy, logging, API keys, host, non-interactive mode, providers, routing rules, and API timeouts.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_1>

LANGUAGE: json
CODE:

```
{
  "PROXY_URL": "http://127.0.0.1:7890",
  "LOG": true,
  "LOG_LEVEL": "debug",
  "APIKEY": "your-secret-key",
  "HOST": "0.0.0.0",
  "NON_INTERACTIVE_MODE": true,
  "Providers": { ... },
  "Router": {
    "default": "model-name"
  },
  "API_TIMEOUT_MS": 5000
}
```

--------------------------------

TITLE: Vite ESLint Configuration with React-Specific Rules
DESCRIPTION: Extends the ESLint configuration for a Vite + TypeScript project to include specific rules for React and React DOM using external plugins. This setup also requires project configuration for type checking.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/ui/README.md#_snippet_1>

LANGUAGE: javascript
CODE:

```
import tseslint from 'typescript-eslint'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

function globalIgnores(ignores) {
  return {
    ignores: ignores
  }
}
```

--------------------------------

TITLE: Vite ESLint Configuration with Type-Checked Rules
DESCRIPTION: Configures ESLint for a Vite + TypeScript project, enabling type-aware linting rules. It requires specifying project configuration files and the root directory for TypeScript.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/ui/README.md#_snippet_0>

LANGUAGE: javascript
CODE:

```
import tseslint from 'typescript-eslint'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      // ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      // ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

function globalIgnores(ignores) {
  return {
    ignores: ignores
  }
}
```

--------------------------------

TITLE: API Client Methods
DESCRIPTION: Provides methods for handling HTTP requests with base URL and API key authentication. Supports GET, POST, PUT, and DELETE requests.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/ui/CLAUDE.md#_snippet_1>

LANGUAGE: APIDOC
CODE:

```
ApiClient:
  __init__(baseUrl: str, apiKey: str)
    baseUrl: The base URL for API requests.
    apiKey: The API key for authentication.

  get(endpoint: str, params?: object)
    endpoint: The API endpoint to request.
    params: Optional query parameters.
    Returns: Promise<any>

  post(endpoint: str, data?: object)
    endpoint: The API endpoint to post to.
    data: The data to send in the request body.
    Returns: Promise<any>

  put(endpoint: str, data?: object)
    endpoint: The API endpoint to update.
    data: The data to send in the request body.
    Returns: Promise<any>

  delete(endpoint: str)
    endpoint: The API endpoint to delete from.
    Returns: Promise<any>
```

--------------------------------

TITLE: Debug Claude Code with Chrome DevTools
DESCRIPTION: Command to start Claude Code in debug mode, allowing connection with Chrome DevTools.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/zh/项目初衷及原理.md#_snippet_2>

LANGUAGE: bash
CODE:

```
NODE_OPTIONS="--inspect-brk=9229" claude
```

--------------------------------

TITLE: Global Transformer Configuration
DESCRIPTION: Applies a transformer to all models under a specific provider. This example shows the 'openrouter' transformer applied to all models within the 'openrouter' provider.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README_zh.md#_snippet_3>

LANGUAGE: json
CODE:

```
{
  "name": "openrouter",
  "api_base_url": "https://openrouter.ai/api/v1/chat/completions",
  "api_key": "sk-xxx",
  "models": [
    "google/gemini-2.5-pro-preview",
    "anthropic/claude-sonnet-4",
    "anthropic/claude-3.5-sonnet"
  ],
  "transformer": { "use": ["openrouter"] }
}
```

--------------------------------

TITLE: Global Transformer Configuration (OpenRouter)
DESCRIPTION: Applies a transformer to all models from a specific provider. This example shows the 'openrouter' transformer applied to models under the 'openrouter' provider.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_6>

LANGUAGE: json
CODE:

```
{
  "name": "openrouter",
  "api_base_url": "https://openrouter.ai/api/v1/chat/completions",
  "api_key": "sk-xxx",
  "models": [
    "google/gemini-2.5-pro-preview",
    "anthropic/claude-sonnet-4",
    "anthropic/claude-3.5-sonnet"
  ],
  "transformer": { "use": ["openrouter"] }
}
```

--------------------------------

TITLE: Model-Specific Transformer Configuration
DESCRIPTION: Applies transformers to specific models. This example applies 'deepseek' to all models and an additional 'tooluse' transformer specifically to the 'deepseek-chat' model.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README_zh.md#_snippet_4>

LANGUAGE: json
CODE:

```
{
  "name": "deepseek",
  "api_base_url": "https://api.deepseek.com/chat/completions",
  "api_key": "sk-xxx",
  "models": ["deepseek-chat", "deepseek-reasoner"],
  "transformer": {
    "use": ["deepseek"],
    "deepseek-chat": { "use": ["tooluse"] }
  }
}
```

--------------------------------

TITLE: Model-Specific Transformer Configuration (DeepSeek)
DESCRIPTION: Applies transformers to specific models. This example applies the 'deepseek' transformer to all models and an additional 'tooluse' transformer to the 'deepseek-chat' model.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_7>

LANGUAGE: json
CODE:

```
{
  "name": "deepseek",
  "api_base_url": "https://api.deepseek.com/chat/completions",
  "api_key": "sk-xxx",
  "models": ["deepseek-chat", "deepseek-reasoner"],
  "transformer": {
    "use": ["deepseek"],
    "deepseek-chat": { "use": ["tooluse"] }
  }
}
```

--------------------------------

TITLE: Project Commands
DESCRIPTION: Common commands for managing the project, including running the development server, building for production, linting, and previewing the build.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/ui/CLAUDE.md#_snippet_0>

LANGUAGE: bash
CODE:

```
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

--------------------------------

TITLE: Claude Code package.json
DESCRIPTION: The package.json file for the @anthropic-ai/claude-code npm package, showing entry points, dependencies, and scripts.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/en/project-motivation-and-how-it-works.md#_snippet_1>

LANGUAGE: json
CODE:

```
{
  "name": "@anthropic-ai/claude-code",
  "version": "1.0.24",
  "main": "sdk.mjs",
  "types": "sdk.d.ts",
  "bin": {
    "claude": "cli.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "type": "module",
  "author": "Boris Cherny <boris@anthropic.com>",
  "license": "SEE LICENSE IN README.md",
  "description": "Use Claude, Anthropic's AI assistant, right from your terminal. Claude can understand your codebase, edit files, run terminal commands, and handle entire workflows for you.",
  "homepage": "https://github.com/anthropics/claude-code",
  "bugs": {
    "url": "https://github.com/anthropics/claude-code/issues"
  },
  "scripts": {
    "prepare": "node -e \"if (!process.env.AUTHORIZED) { console.error('ERROR: Direct publishing is not allowed.\nPlease use the publish-external.sh script to publish this package.'); process.exit(1); }\"",
    "preinstall": "node scripts/preinstall.js"
  },
  "dependencies": {},
  "optionalDependencies": {
    "@img/sharp-darwin-arm64": "^0.33.5",
    "@img/sharp-darwin-x64": "^0.33.5",
    "@img/sharp-linux-arm": "^0.33.5",
    "@img/sharp-linux-arm64": "^0.33.5",
    "@img/sharp-linux-x64": "^0.33.5",
    "@img/sharp-win32-x64": "^0.33.5"
  }
}
```

--------------------------------

TITLE: Fastify Integration in LLM Provider Logic
DESCRIPTION: Demonstrates how the `@musistudio/llms` dependency, built on Fastify, allows direct use of server hooks.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/CLAUDE.md#_snippet_6>

LANGUAGE: javascript
CODE:

```
server.addHook('onRequest', (request, reply) => {
  // Custom logic before handling the request
});
```

--------------------------------

TITLE: Build Project
DESCRIPTION: Builds the TypeScript project using npm.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/CLAUDE.md#_snippet_0>

LANGUAGE: bash
CODE:

```
npm run build
```

--------------------------------

TITLE: Package.json for Claude Code
DESCRIPTION: The package.json file for the @anthropic-ai/claude-code npm package, showing its main entry point, dependencies, and scripts.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/zh/项目初衷及原理.md#_snippet_1>

LANGUAGE: json
CODE:

```
{
  "name": "@anthropic-ai/claude-code",
  "version": "1.0.24",
  "main": "sdk.mjs",
  "types": "sdk.d.ts",
  "bin": {
    "claude": "cli.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "type": "module",
  "author": "Boris Cherny <boris@anthropic.com>",
  "license": "SEE LICENSE IN README.md",
  "description": "Use Claude, Anthropic's AI assistant, right from your terminal. Claude can understand your codebase, edit files, run terminal commands, and handle entire workflows for you.",
  "homepage": "https://github.com/anthropics/claude-code",
  "bugs": {
    "url": "https://github.com/anthropics/claude-code/issues"
  },
  "scripts": {
    "prepare": "node -e \"if (!process.env.AUTHORIZED) { console.error('ERROR: Direct publishing is not allowed.\nPlease use the publish-external.sh script to publish this package.'); process.exit(1); }\",
    "preinstall": "node scripts/preinstall.js"
  },
  "dependencies": {},
  "optionalDependencies": {
    "@img/sharp-darwin-arm64": "^0.33.5",
    "@img/sharp-darwin-x64": "^0.33.5",
    "@img/sharp-linux-arm": "^0.33.5",
    "@img/sharp-linux-arm64": "^0.33.5",
    "@img/sharp-linux-x64": "^0.33.5",
    "@img/sharp-win32-x64": "^0.33.5"
  }
}
```

--------------------------------

TITLE: TypeScript Project Structure Overview
DESCRIPTION: Overview of key files and directories in the TypeScript Claude Code router project.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/CLAUDE.md#_snippet_5>

LANGUAGE: typescript
CODE:

```
// src/cli.ts: Handles command-line interface logic.
// src/index.ts: Initiates the server.
// src/utils/router.ts: Contains the core routing logic.
```

--------------------------------

TITLE: Model Selection and Cost Optimization
DESCRIPTION: Explains the rationale behind choosing the DeepSeek-V3 model for the Claude Code router system, highlighting its performance in tool calls, task decomposition, and significant cost savings compared to Claude 3.5 Sonnet. It also notes the identical behavior of 'Think' and 'UltraThink' due to DeepSeek-R1's lack of cost control.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/en/project-motivation-and-how-it-works.md#_snippet_5>

LANGUAGE: APIDOC
CODE:

```
ModelPerformance:
  PrimaryModel: DeepSeek-V3
    Advantages:
      - Supports most tool calls.
      - Handles task decomposition and stepwise planning.
      - Cost-effective (less than 1/10th the price of Claude 3.5 Sonnet).

  ReasoningModel: DeepSeek-R1
    Behavior:
      - Used for 'think' and 'UltraThink' roles.
      - 'Think' and 'UltraThink' behave identically due to lack of cost control.

  Comparison:
    - DeepSeek-V3 offers superior performance and cost-efficiency over Claude 3.5 Sonnet.
```

--------------------------------

TITLE: Claude Code Router Architecture Roles
DESCRIPTION: Describes the four primary roles within the redesigned Claude Code router system: default model for general tasks, background model for lightweight tasks (routed to Ollama), think model for reasoning (using DeepSeek-R1), and longContext model for extended contexts (compensating for DeepSeek limitations).

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/en/project-motivation-and-how-it-works.md#_snippet_4>

LANGUAGE: APIDOC
CODE:

```
ClaudeCodeRouter:
  Roles:
    - default: Handles general tasks and acts as a fallback.
    - background: Manages lightweight background tasks, routed to Ollama (e.g., Claude Haiku 3.5).
    - think: Responsible for reasoning and planning tasks (uses DeepSeek-R1).
    - longContext: Handles long-context scenarios (switches based on token count > 32K).

  Functionality:
    - Task dispatching based on model capabilities and context length.
    - Real-time token length calculation using tiktoken.
    - Customization through environment variable overrides.

  Dependencies:
    - Ollama (for background model)
    - tiktoken (for token calculation)
    - DeepSeek models (V3, R1)
```

--------------------------------

TITLE: Qwen CLI Transformer (Experimental)
DESCRIPTION: Unofficial support for qwen3-coder-plus model via Qwen CLI. This snippet shows the reference to the qwen-cli.js.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_12>

LANGUAGE: javascript
CODE:

```
https://gist.github.com/musistudio/f5a67841ced39912fd99e42200d5ca8b
```

--------------------------------

TITLE: Customization via Environment Variables
DESCRIPTION: Explains how environment variables can be overridden to forward and modify requests within Claude Code without altering its source code. This allows users to leverage official updates while implementing custom models and prompts.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/en/project-motivation-and-how-it-works.md#_snippet_7>

LANGUAGE: Python
CODE:

```
# Example of overriding environment variables for custom routing
import os

# Set custom model for a specific role
os.environ['ROUTER_THINK_MODEL'] = 'DeepSeek-R1'
os.environ['ROUTER_BACKGROUND_SERVICE'] = 'ollama'

# Simulate a request processing flow
def process_request(task):
    if task.type == 'reasoning':
        model = os.environ.get('ROUTER_THINK_MODEL', 'default_reasoning_model')
        # Call the reasoning model
        pass
    elif task.type == 'background':
        service = os.environ.get('ROUTER_BACKGROUND_SERVICE', 'default_background_service')
        # Call the background service
        pass
    else:
        # Handle default tasks
        pass

# Note: Actual implementation would involve more complex logic for context management and model switching.
```

--------------------------------

TITLE: DeepSeek Tool Mode Implementation
DESCRIPTION: Implements a 'Tool Mode' for DeepSeek models to enhance tool invocation frequency. It injects a system reminder and sets `tool_choice` to 'required'. An `ExitTool` function is added to allow the model to exit tool mode when no suitable tool is available or the task is complete. This is primarily for models supporting the `tool_choice` parameter.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/zh/或许我们能在Router中做更多事情.md#_snippet_0>

LANGUAGE: typescript
CODE:

```
export class TooluseTransformer implements Transformer {
  name = "tooluse";

  transformRequestIn(request: UnifiedChatRequest): UnifiedChatRequest {
    if (request.tools?.length) {
      request.messages.push({
        role: "system",
        content: `<system-reminder>Tool mode is active. The user expects you to proactively execute the most suitable tool to help complete the task. 
Before invoking a tool, you must carefully evaluate whether it matches the current task. If no available tool is appropriate for the task, you MUST call the `ExitTool` to exit tool mode — this is the only valid way to terminate tool mode.
Always prioritize completing the user's task effectively and efficiently by using tools whenever appropriate.</system-reminder>`,
      });
      request.tool_choice = "required";
      request.tools.unshift({
        type: "function",
        function: {
          name: "ExitTool",
          description: `Use this tool when you are in tool mode and have completed the task. This is the only valid way to exit tool mode.
IMPORTANT: Before using this tool, ensure that none of the available tools are applicable to the current task. You must evaluate all available options — only if no suitable tool can help you complete the task should you use ExitTool to terminate tool mode.
Examples:
1. Task: "Use a tool to summarize this document" — Do not use ExitTool if a summarization tool is available.
2. Task: "What’s the weather today?" — If no tool is available to answer, use ExitTool after reasoning that none can fulfill the task.`,
          parameters: {
            type: "object",
            properties: {
              response: {
                type: "string",
                description:
                  "Your response will be forwarded to the user exactly as returned — the tool will not modify or post-process it in any way.",
              },
            },
            required: ["response"],
          },
        },
      });
    }
    return request;
  }

  async transformResponseOut(response: Response): Promise<Response> {
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      const jsonResponse = await response.json();
      if (
        jsonResponse?.choices[0]?.message.tool_calls?.length &&
        jsonResponse?.choices[0]?.message.tool_calls[0]?.function?.name ===
          "ExitTool"
      ) {
        const toolArguments = JSON.parse(toolCall.function.arguments || "{}");
        jsonResponse.choices[0].message.content = toolArguments.response || "";
        delete jsonResponse.choices[0].message.tool_calls;
      }

      // Handle non-streaming response if needed
      return new Response(JSON.stringify(jsonResponse), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    } else if (response.headers.get("Content-Type")?.includes("stream")) {
      // ...
    }
    return response;
  }
}
```

--------------------------------

TITLE: Run Claude Code Router in UI Mode
DESCRIPTION: Command to launch the Claude Code Router in UI mode for a visual configuration experience.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README_zh.md#_snippet_2>

LANGUAGE: shell
CODE:

```
ccr ui
```

--------------------------------

TITLE: Accessing Claude Code Router UI Mode
DESCRIPTION: Command to launch the web-based UI for Claude Code Router, which provides an intuitive interface for managing the configuration file.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_5>

LANGUAGE: shell
CODE:

```
ccr ui
```

--------------------------------

TITLE: DeepSeek Tool Mode Implementation
DESCRIPTION: This TypeScript code implements a 'Tool Mode' for the DeepSeek model to improve its tool usage. It injects a system reminder and sets the `tool_choice` parameter to 'required' to encourage proactive tool execution. It also defines an `ExitTool` function for gracefully exiting tool mode.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/en/maybe-we-can-do-more-with-the-route.md#_snippet_1>

LANGUAGE: typescript
CODE:

```
export class TooluseTransformer implements Transformer {
  name = "tooluse";

  transformRequestIn(request: UnifiedChatRequest): UnifiedChatRequest {
    if (request.tools?.length) {
      request.messages.push({
        role: "system",
        content: `<system-reminder>Tool mode is active. The user expects you to proactively execute the most suitable tool to help complete the task. 
Before invoking a tool, you must carefully evaluate whether it matches the current task. If no available tool is appropriate for the task, you MUST call the `ExitTool` to exit tool mode — this is the only valid way to terminate tool mode.
Always prioritize completing the user's task effectively and efficiently by using tools whenever appropriate.</system-reminder>`,
      });
      request.tool_choice = "required";
      request.tools.unshift({
        type: "function",
        function: {
          name: "ExitTool",
          description: `Use this tool when you are in tool mode and have completed the task. This is the only valid way to exit tool mode.
IMPORTANT: Before using this tool, ensure that none of the available tools are applicable to the current task. You must evaluate all available options — only if no suitable tool can help you complete the task should you use ExitTool to terminate tool mode.
Examples:
1. Task: "Use a tool to summarize this document" — Do not use ExitTool if a summarization tool is available.
2. Task: "What’s the weather today?" — If no tool is available to answer, use ExitTool after reasoning that none can fulfill the task.`,
          parameters: {
            type: "object",
            properties: {
              response: {
                type: "string",
                description:
              }
            }
          }
        }
      });
    }
    return request;
  }
}
```

--------------------------------

TITLE: Release New Version
DESCRIPTION: Releases a new version of the project using npm.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/CLAUDE.md#_snippet_3>

LANGUAGE: bash
CODE:

```
npm run release
```

--------------------------------

TITLE: Transformer with Options (Siliconflow)
DESCRIPTION: Demonstrates passing options to a transformer. The 'maxtoken' transformer is configured with a 'max_tokens' option.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_8>

LANGUAGE: json
CODE:

```
{
  "name": "siliconflow",
  "api_base_url": "https://api.siliconflow.cn/v1/chat/completions",
  "api_key": "sk-xxx",
  "models": ["moonshotai/Kimi-K2-Instruct"],
  "transformer": {
    "use": [
      [
        "maxtoken",
        {
          "max_tokens": 16384
        }
      ]
    ]
  }
}
```

--------------------------------

TITLE: Launch Claude Code in Debug Mode
DESCRIPTION: Command to launch the Claude Code CLI with Node.js inspector enabled, allowing debugging via Chrome DevTools.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/en/project-motivation-and-how-it-works.md#_snippet_2>

LANGUAGE: bash
CODE:

```
NODE_OPTIONS="--inspect-brk=9229" claude
```

--------------------------------

TITLE: System Redesign and Function Call Support
DESCRIPTION: Details the system redesign following the launch of official Claude Code and the addition of Function Call support in the DeepSeek-R1 model. It addresses earlier request/response transformation issues, particularly with models returning JSON instead of Function Call outputs, leveraging AI pair programming for fixes.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/en/project-motivation-and-how-it-works.md#_snippet_6>

LANGUAGE: APIDOC
CODE:

```
SystemEvolution:
  Phase1:
    - Router-based mode with lightweight model.
    - Roles: router, tool, think, coder.
    - Issue: Lightweight model lacked accurate routing capabilities.

  Phase2 (Post Claude Code Launch):
    - Redesigned system with DeepSeek-R1 (Function Call support).
    - Addressed request/response transformation issues (JSON vs. Function Call outputs).
    - Utilized AI pair programming for fixes.

  Key Improvement:
    - Enhanced model routing accuracy and output handling.
```

--------------------------------

TITLE: Transformer Interface for AI Provider Compatibility
DESCRIPTION: This section describes the Transformer interface used to handle compatibility issues between different AI providers. It allows for bidirectional conversion of requests and responses between formats like OpenAI and Gemini, enabling seamless interoperability.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/en/maybe-we-can-do-more-with-the-route.md#_snippet_0>

LANGUAGE: python
CODE:

```
class Transformer:
    def transformRequestIn(self, request):
        pass

    def transformResponseOut(self, response):
        pass

    def transformRequestOut(self, request):
        pass

    def transformResponseIn(self, response):
        pass
```

--------------------------------

TITLE: Custom Transformer Configuration
DESCRIPTION: Loads custom transformers by specifying their path and options in the 'transformers' field of the config.json.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README_zh.md#_snippet_7>

LANGUAGE: json
CODE:

```
{
  "transformers": [
      {
        "path": "/User/xxx/.claude-code-router/plugins/gemini-cli.js",
        "options": {
          "project": "xxx"
        }
      }
  ]
}
```

--------------------------------

TITLE: Vendor Compatibility Transformation Flow
DESCRIPTION: Illustrates the data flow for transforming requests and responses between different AI service providers using a common intermediary format. This approach aims to abstract away vendor-specific differences.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/zh/或许我们能在Router中做更多事情.md#_snippet_1>

LANGUAGE: APIDOC
CODE:

```
AnthropicRequest -> AnthropicTransformer -> OpenAIRequest -> GeminiTransformer -> GeminiRequest -> GeminiServer

GeminiReseponse -> GeminiTransformer -> OpenAIResponse -> AnthropicTransformer -> AnthropicResponse
```

--------------------------------

TITLE: Run Claude Code Router
DESCRIPTION: Commands to run the Claude Code Router service and restart it after configuration changes.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README_zh.md#_snippet_1>

LANGUAGE: shell
CODE:

```
ccr code
```

LANGUAGE: shell
CODE:

```
ccr restart
```

--------------------------------

TITLE: Default Router Configuration
DESCRIPTION: Defines model usage for various scenarios like general tasks, background operations, reasoning, and long contexts. Includes an optional threshold for long context triggering and specifies requirements for web search models.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_14>

LANGUAGE: APIDOC
CODE:

```
Router Configuration:
  default: Model for general tasks.
  background: Model for background tasks (e.g., smaller, local model).
  think: Model for reasoning-heavy tasks (e.g., Plan Mode).
  longContext: Model for handling contexts exceeding a token threshold.
  longContextThreshold (optional): Token count threshold for long context model (defaults to 60000).
  webSearch: Model for web search tasks (requires model support; use ':online' suffix for OpenRouter).
```

--------------------------------

TITLE: OpenRouter Provider Routing Transformer
DESCRIPTION: Demonstrates using the 'openrouter' transformer with a 'provider' routing parameter to specify underlying providers for specific models.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README_zh.md#_snippet_6>

LANGUAGE: json
CODE:

```
{
  "transformer": {
    "use": ["openrouter"],
    "moonshotai/kimi-k2": {
      "use": [
        [
          "openrouter",
          {
            "provider": {
              "only": ["moonshotai/fp8"]
            }
          }
        ]
      ]
    }
  }
}
```

--------------------------------

TITLE: Gemini CLI Transformer (Experimental)
DESCRIPTION: Unofficial support for Gemini via Gemini CLI. This snippet shows the reference to the gemini-cli.js.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_11>

LANGUAGE: javascript
CODE:

```
https://gist.github.com/musistudio/1c13a65f35916a7ab690649d3df8d1cd
```

--------------------------------

TITLE: Custom Transformer Loading
DESCRIPTION: Configuration for loading custom transformers via the 'transformers' field in config.json, specifying the path and options for a transformer plugin.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_10>

LANGUAGE: json
CODE:

```
{
  "transformers": [
    {
      "path": "/User/xxx/.claude-code-router/plugins/gemini-cli.js",
      "options": {
        "project": "xxx"
      }
    }
  ]
}
```

--------------------------------

TITLE: Switching Models Dynamically
DESCRIPTION: Allows users to change the active model dynamically within Claude Code using a command-line interface.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_15>

LANGUAGE: APIDOC
CODE:

```
Dynamic Model Switching:
  Command: /model provider_name,model_name
  Example: /model openrouter,anthropic/claude-3.5-sonnet
```

--------------------------------

TITLE: Express.js Endpoint for API Routing
DESCRIPTION: Illustrates the use of Express.js to implement the /v1/messages endpoint, a core component of the claude-code-router project for transforming API requests.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/blog/en/project-motivation-and-how-it-works.md#_snippet_3>

LANGUAGE: javascript
CODE:

```
// Example structure for Express.js implementation
const express = require('express');
const app = express();

app.post('/v1/messages', (req, res) => {
  // Middleware to transform request to Anthropic format
  // ...

  // Make request to Anthropic API
  // ...

  // Middleware to transform response to OpenAI format
  // ...
  res.send('Message processed');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

--------------------------------

TITLE: Rovo CLI Transformer (Experimental)
DESCRIPTION: Unofficial support for gpt-5 via Atlassian Rovo Dev CLI. This snippet shows the reference to the rovo-cli.js.

SOURCE: <https://github.com/ssiagu/claude-code-router/blob/main/README.md#_snippet_13>

LANGUAGE: javascript
CODE:

```
https://gist.github.com/SaseQ/c2a20a38b11276537ec5332d1f7a5e53
```
