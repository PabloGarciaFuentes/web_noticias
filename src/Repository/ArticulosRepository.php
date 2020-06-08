<?php

namespace App\Repository;

use App\Entity\Articulos;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Articulos|null find($id, $lockMode = null, $lockVersion = null)
 * @method Articulos|null findOneBy(array $criteria, array $orderBy = null)
 * @method Articulos[]    findAll()
 * @method Articulos[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticulosRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Articulos::class);
    }

    // /**
    //  * @return Articulos[] Returns an array of Articulos objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Articulos
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    //Esta función de abajo es la queryBuilder para el paginador
    public function ListadoArticulos($column, $tipo = "DESC", $pos, $cant = 2){
        $tbl = "p";
        $qb = $this->createQueryBuilder($tbl)
                    ->orderBy($tbl.".".strtolower($column), $tipo)
                    ->setFirstResult($pos)
                    ->setMaxResults($cant);
        $query = $qb->getQuery();

        return $query->execute();
    }

    public function Guardar(Articulos $Articulos):Articulos{
        $em = $this->getEntityManager();
        $em->persist($Articulos);
        $em->flush();
        return $Articulos;
    }

    public function Borrar(Articulos $Articulos):Articulos{
        $em = $this->getEntityManager();
        $em->remove($Articulos);
        $em->flush();

        return $Articulos;
    }
}
