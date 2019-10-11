<?php

namespace Brettanda\Project;

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Yaml\Yaml;

class Homestead
{
    /**
     * The base path of the project installation.
     *
     * @var string
     */
    protected $basePath;

    /**
     * The bound filesystem.
     *
     * @var Symfony\Component\Filesystem\Filesystem
     */
    protected $fs;

    public function __construct($basePath)
    {
        $this->basePath = $basePath;
        $this->fs = new Filesystem;
        $this->setup();
    }

    public function setup()
    {
        $config = Yaml::parseFile("{$this->basePath}/Homestead.yaml");

        $name = preg_split('/(?=\.[^.]+$)/', basename($this->basePath))[0];

        $config['name'] = "{$name}-brettanda";
        $config['hostname'] = "{$name}-brettanda";
        $config['sites'][0]['map'] = "$name.brettanda.test";
        $config['sites'][1]['map'] = "static.$name.brettanda.test";

        $this->fs->dumpFile("{$this->basePath}/Homestead.yaml", Yaml::dump($config, 3, 2));
    }
}
