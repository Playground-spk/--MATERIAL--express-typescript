const { Command } = require('commander');
const program = new Command();
const path = require('path');
const fs = require('fs');

const snakeToCamel = (snake) => {
  return snake.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
};

const camelToPasCal = (camel) => {
  let pasCal = camel[0].toUpperCase() + camel.slice(1);

  return pasCal;
};

const checkModuleNotExistThenCreateModulesDIr = () => {
  const moduleDir = path.join(__dirname, `../modules`);

  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir);
  }
};

const handleMakeFileRoute = (filePath, moduleName) => {
  const standardRoute = path.join(__dirname, './demoModule/demo.route.config.ts');

  let routefile = fs.readFileSync(standardRoute, 'utf-8');
  routefile = routefile.split('demo').join(moduleName);
  routefile = routefile.split(moduleName+'Controller').join(snakeToCamel(moduleName)+'Controller');
  routefile = routefile.split('Demo').join(camelToPasCal(snakeToCamel(moduleName)));

  fs.writeFileSync(filePath + `/${moduleName}.route.config.ts`, routefile);
};

const handleMakeFileController = (filePath, moduleName) => {
  const standardController = path.join(__dirname, './demoModule/demo.controller.ts');

  let controllerFile = fs.readFileSync(standardController,'utf-8')
  controllerFile = controllerFile.split('demo').join(moduleName);
  controllerFile = controllerFile.split(moduleName+'Service').join(snakeToCamel(moduleName)+'Service');
  controllerFile = controllerFile.split('Demo').join(camelToPasCal(snakeToCamel(moduleName)));

  fs.writeFileSync(filePath + `/${moduleName}.controller.ts`, controllerFile);
}

const handleMakeFileService = (filePath, moduleName) => {
  const standardService = path.join(__dirname, './demoModule/demo.service.ts');

  let serviceFile = fs.readFileSync(standardService,'utf-8')
  serviceFile = serviceFile.split('demo').join(moduleName);
  // serviceFile = serviceFile.split(moduleName+'Service').join(snakeToCamel(moduleName)+'Service');
  serviceFile = serviceFile.split('Demo').join(camelToPasCal(snakeToCamel(moduleName)));

  fs.writeFileSync(filePath + `/${moduleName}.service.ts`, serviceFile);
}

const handleMakeFileCreateDto = (filePath, moduleName) => {
  const standardDtoCreate = path.join(__dirname, './demoModule/dto/create-demo.dto.ts');

  let dtoCreateFile = fs.readFileSync(standardDtoCreate,'utf-8')
  dtoCreateFile = dtoCreateFile.split('demo').join(moduleName);
  dtoCreateFile = dtoCreateFile.split('Demo').join(camelToPasCal(snakeToCamel(moduleName)));

  fs.writeFileSync(filePath + `/dto/create-${moduleName}.dto.ts`, dtoCreateFile);
}

program.version('1.0.0').description('CLI create API modules');

program
  .command('create <moduleName>')
  .alias('c')
  .action((moduleName) => {
    const dir = path.join(__dirname, `../modules/${moduleName}`);
    const moduleCamelCase = snakeToCamel(moduleName);
    const modulePascal = camelToPasCal(moduleCamelCase);
    checkModuleNotExistThenCreateModulesDIr();
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(dir + '/dto');
      handleMakeFileRoute(dir, moduleName);
      handleMakeFileController(dir,moduleName)
      handleMakeFileService(dir,moduleName)
      handleMakeFileCreateDto(dir,moduleName)
    } else {
      throw new Error('module exist already cannot overwrite');
    }
  });

program.parse(process.argv);
