<?php
namespace Acme\SPA\ApiBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Acme\SPA\ApiBundle\Entity\Author;
use Doctrine\Common\DataFixtures\AbstractFixture;

class AuthorFixtures extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $author = new Author();
        $author->setFirstname('Philip K.')->setLastname('Dick');

        $manager->persist($author);
        $this->addReference('dick', $author);

        $author = new Author();
        $author->setFirstname('Ray')->setLastname('Bradbury');

        $manager->persist($author);
        $this->addReference('bradbury', $author);

        $author = new Author();
        $author->setFirstname('Douglas')->setLastname('Adams');

        $manager->persist($author);
        $this->addReference('adams', $author);

        $manager->flush();

    }

    public function getOrder()
    {
        return 2;
    }
}
