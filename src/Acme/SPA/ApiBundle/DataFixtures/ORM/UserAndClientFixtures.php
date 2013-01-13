<?php
namespace Acme\SPA\ApiBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use FOS\OAuthServerBundle\Entity\TokenManager;

class UserAndClientFixtures extends AbstractFixture implements ContainerAwareInterface, OrderedFixtureInterface
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        /* @var $manipulator \FOS\UserBundle\Util\UserManipulator */
        $manipulator = $this->container->get('fos_user.util.user_manipulator');
        $user = $manipulator->create('chaplin', 'symfony', 'chaplin@symfony.com', true, false);

        $clientManager = $this->container->get('fos_oauth_server.client_manager.default');

        $chaplinClient= $clientManager->createClient();
        $chaplinClient->setRedirectUris(array('http://www.google.com'));
        $chaplinClient->setAllowedGrantTypes(array('password'));
        $clientManager->updateClient($chaplinClient);

    }

    /**
     * @return number
     */
    public function getOrder()
    {
        return 1;
    }

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }
}
