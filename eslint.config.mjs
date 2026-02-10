import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import fsdPlugin from "eslint-plugin-fsd-lint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { fsd: fsdPlugin },
    rules: {
      "fsd/forbidden-imports": [
        "warn",
        { alias: { value: "@", withSlash: true } },
      ],
      "fsd/no-relative-imports": ["warn", { allowSameSlice: true }],
      "fsd/no-public-api-sidestep": "warn",
      "fsd/no-cross-slice-dependency": "warn",
      "fsd/no-ui-in-business-logic": "warn",
      "fsd/no-global-store-imports": "warn",
      "fsd/ordered-imports": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
