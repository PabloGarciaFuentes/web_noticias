<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
//use Symfony\Component\HttpFoundation\JsonResponse;
//use Symfony\Component\Serializer\Encoder\JsonEncoder;
//use Symfony\Component\Serializer\Encoder\XmlEncoder;
//use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use App\Entity\Articulos;

class ArticuloController extends AbstractController
{
    public function index()
    {
        return $this->render('articulo/index.html.twig', [
            'controller_name' => 'ArticuloController',
        ]);
    }

    public function obtenerjson(){
        $articulos= $this->getDoctrine()->getRepository(Articulos::class)->findAll();        
        
        $serializer = $this->get('serializer');                      
        $data = $serializer->serialize($articulos, 'json');
        
        $response = new Response($data, 200, [
            "Content-Type" => "application/json"        
        ]);
        
        return $response;
    }
}
