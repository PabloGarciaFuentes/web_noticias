<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Articulos
 *
 * @ORM\Table(name="articulos", indexes={@ORM\Index(name="idCategoria", columns={"idCategoria"})})
 * @ORM\Entity(repositoryClass="App\Repository\ArticulosRepository")
 */
class Articulos
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
     * @ORM\Column(name="titulo", type="string", length=250, nullable=false)
     */
    private $titulo;

    /**
     * @var string
     *
     * @ORM\Column(name="descirpcion", type="string", length=500, nullable=false)
     */
    private $descirpcion;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fechaCreacion", type="datetime", nullable=false)
     */
    private $fechacreacion;

    /**
     * @var int|null
     *
     * @ORM\Column(name="numeroVisitas", type="integer", nullable=true)
     */
    private $numerovisitas;

    /**
     * @var int|null
     *
     * @ORM\Column(name="Valoracion", type="integer", nullable=true)
     */
    private $valoracion;

    /**
     * @var \Categoria
     *
     * @ORM\ManyToOne(targetEntity="Categoria")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idCategoria", referencedColumnName="id")
     * })
     */
    private $idcategoria;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitulo(): ?string
    {
        return $this->titulo;
    }

    public function setTitulo(string $titulo): self
    {
        $this->titulo = $titulo;

        return $this;
    }

    public function getDescirpcion(): ?string
    {
        return $this->descirpcion;
    }

    public function setDescirpcion(string $descirpcion): self
    {
        $this->descirpcion = $descirpcion;

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

    public function getNumerovisitas(): ?int
    {
        return $this->numerovisitas;
    }

    public function setNumerovisitas(?int $numerovisitas): self
    {
        $this->numerovisitas = $numerovisitas;

        return $this;
    }

    public function getValoracion(): ?int
    {
        return $this->valoracion;
    }

    public function setValoracion(?int $valoracion): self
    {
        $this->valoracion = $valoracion;

        return $this;
    }

    public function getIdcategoria(): ?Categoria
    {
        return $this->idcategoria;
    }

    public function setIdcategoria(?Categoria $idcategoria): self
    {
        $this->idcategoria = $idcategoria;

        return $this;
    }


}
