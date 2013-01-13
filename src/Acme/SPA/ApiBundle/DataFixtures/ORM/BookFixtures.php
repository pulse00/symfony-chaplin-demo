<?php
namespace Acme\SPA\ApiBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\Persistence\ObjectManager;
use Acme\SPA\ApiBundle\Entity\Book;



class BookFixtures extends AbstractFixture implements OrderedFixtureInterface
{

    public function load(ObjectManager $manager)
    {
        $book = new Book();
        $book
            ->setTitle('The Man in the High Castle')
            ->setDescription('The story of The Man in the High Castle, about daily life under totalitarian Fascist imperialism, occurs in 1962, fifteen years after the end of a longer Second World War (1939–1947 in this history).')
            ->addAuthor($this->getReference('dick'));
        ;

        $manager->persist($book);

        $book = new Book();
        $book
            ->setTitle('The Martian Chronicles')
            ->setDescription('The Martian Chronicles is a 1950 science fiction short story collection by Ray Bradbury that chronicles the colonization of Mars by humans fleeing from a troubled and eventually atomically devastated Earth, and the conflict between aboriginal Martians and the new colonists.')
            ->addAuthor($this->getReference('bradbury'));
        ;

        $manager->persist($book);

        $book = new Book();
        $book
            ->setTitle('The Hitchhiker\'s Guide to the Galaxy')
            ->setDescription("The Hitchhiker's Guide to the Galaxy is the first of five books in the Hitchhiker's Guide to the Galaxy comedy science fiction \"trilogy\" by Douglas Adams (with the sixth written by Eoin Colfer).")
            ->addAuthor($this->getReference('adams'));
        ;

        $manager->persist($book);

        $manager->flush();
    }

    public function getOrder()
    {
        return 3;
    }
}
