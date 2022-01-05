<?php
require_once 'vendor/autoload.php';

$run = new index();

class index
{

  public function __construct()
    {
    $this->loader = new \Twig\Loader\FilesystemLoader('./view/templates');
    $this->twig = new \Twig\Environment($this->loader);
    if ($_POST['data']){
        $this->getData();
    } else {
        $this->getPage();
    }
  }

    /**
     * renvoi la page par défaut
     */
  private function getPage(){

      echo $this->twig->render('index.twig', array());
      exit();
  }

    /**
     * fonction qui génére les données METEO
     */
  private function getData(){

  }

}
