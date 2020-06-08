<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Multimedia
 *
 * @ORM\Table(name="multimedia", indexes={@ORM\Index(name="idArticulo", columns={"idArticulo"})})
 * @ORM\Entity(repositoryClass="App\Repository\MultimediaRepository")
 */
class Multimedia
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nombreFichero", type="string", length=50, nullable=false)
     */
    private $nombrefichero;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="FechaCreacion", type="datetime", nullable=false)
     */
    private $fechacreacion;

    /**
     * @var \Articulos
     *
     * @ORM\ManyToOne(targetEntity="Articulos")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idArticulo", referencedColumnName="id")
     * })
     */
    private $idarticulo;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombrefichero(): ?string
    {
        return $this->nombrefichero;
    }

    public function setNombrefichero(string $nombrefichero): self
    {
        $this->nombrefichero = $nombrefichero;

        return $this;
    }

    public function getFechacreacion(): ?\DateTimeInterface
    {
        return $this->fechacreacion;
    }

    public function setFechacreacion(\DateTimeInterface $fechacreacion): self
    {
        $this->fechacreacion = $fechacreacion;

        return $this;
    }

    public function getIdarticulo(): ?Articulos
    {
        return $this->idarticulo;
    }

    public function setIdarticulo(?Articulos $idarticulo): self
    {
        $this->idarticulo = $idarticulo;

        return $this;
    }


}
