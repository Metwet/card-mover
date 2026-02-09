/**
 * @description Конфигурация lint-staged для автоматической проверки измененных файлов при коммите
 *
 * lint-staged запускает команды только для файлов, которые были добавлены в git staging area
 * Это ускоряет проверку, так как проверяются только измененные файлы
 */
module.exports = {
  // Для TypeScript и JavaScript файлов
  "*.{ts,tsx,js,jsx}": ["npx eslint --fix", "npx prettier --write"],
  "*.{json,md}": ["npx prettier --write"],
};
