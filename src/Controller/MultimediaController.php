<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use App\Entity\Multimedia;
use App\Entity\Articulos;

class MultimediaController extends AbstractController
{
    public function index()
    {
        return $this->render('multimedia/index.html.twig', [
            'controller_name' => 'MultimediaController',
        ]);
    }

    public function ObtenerJsonMultimedia(){
        $multimedia= $this->getDoctrine()->getRepository(Multimedia::class)->findAll();        
        
        $serializer = $this->get('serializer');                      
        $data = $serializer->serialize($multimedia, 'json');
        
        $response = new Response($data, 200, [
            "Content-Type" => "application/json"        
        ]);
        
        return $response;
    }

    public function FileUpload(Request $request){
        $objImagen = [];
        $idArticulo = $request->request->get('id');
        $uploadedFile = $request->files->get('fichero');

        $objArticulo = $this->getDoctrine()->getRepository(Articulos::class)->find($idArticulo);

        $ruta = "img/articulo/".$idArticulo;

            $nombre=$uploadedFile->getClientOriginalName();                                        
            $multi = new Multimedia();          
            $multi->setNombreFichero($nombre);         
            $multi->setIdarticulo($objArticulo);               
            $multi->setFechaCreacion(new \DateTime());
            $uploadedFile->move($ruta, $nombre);
                                                
            $multimedia = $this->getDoctrine()->getRepository(Multimedia::class)->Guardar($multi); 

            //array_push($objImagen, $itemImagen);

         //$multimedia= $this->getDoctrine()->getRepository(Multimedia::class)->findAll();        
        
         $serializer = $this->get('serializer');                      
         $data = $serializer->serialize($multimedia, 'json');
        
         $response = new Response($data, 200, [
             "Content-Type" => "application/json"        
         ]);
        
         return $response;
    }
}
