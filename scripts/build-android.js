#!/usr/bin/env node

/**
 * Builds the Android release artifacts and copies them into the project-level
 * build directory for easier distribution.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const androidDir = path.join(projectRoot, 'android');
const outputDir = path.join(projectRoot, 'build');

const gradleExecutable = path.join(
  androidDir,
  process.platform === 'win32' ? 'gradlew.bat' : 'gradlew'
);

const runGradleTask = (taskName) => {
  const isWindows = process.platform === 'win32';
  const command = isWindows ? 'cmd.exe' : gradleExecutable;
  const args = isWindows ? ['/c', gradleExecutable, taskName] : [taskName];
  const result = spawnSync(command, args, {
    cwd: androidDir,
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(`❌ Failed to start Gradle task "${taskName}": ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`❌ Gradle task "${taskName}" failed. See log above for details.`);
    process.exit(result.status ?? 1);
  }
};

const ensureOutputDirectory = () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
};

const copyIfExists = (sourcePath, fileLabel) => {
  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️  ${fileLabel} not found at ${sourcePath}.`);
    return;
  }

  ensureOutputDirectory();
  const destinationPath = path.join(outputDir, path.basename(sourcePath));
  fs.copyFileSync(sourcePath, destinationPath);
  console.log(`✅ ${fileLabel} copied to ${destinationPath}`);
};

const main = () => {
  console.log('🏗️  Building Android release artifacts...');
  runGradleTask('clean');
  runGradleTask('assembleRelease');
  runGradleTask('bundleRelease');

  const apkPath = path.join(
    androidDir,
    'app',
    'build',
    'outputs',
    'apk',
    'release',
    'app-release.apk'
  );
  const aabPath = path.join(
    androidDir,
    'app',
    'build',
    'outputs',
    'bundle',
    'release',
    'app-release.aab'
  );

  copyIfExists(apkPath, 'APK');
  copyIfExists(aabPath, 'AAB');

  console.log('🎉 Android production build ready in the root build directory.');
};

main();

