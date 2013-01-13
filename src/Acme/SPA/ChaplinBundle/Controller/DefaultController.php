<?php
namespace Acme\SPA\ChaplinBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Acme\SPA\ApiBundle\Entity\Book;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;


class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('AcmeSPAChaplinBundle::layout.html.twig');
    }

    public function listAction()
    {
        return $this->render('AcmeSPAChaplinBundle::layout.html.twig');
    }

    /**
     * @ParamConverter("book", class="AcmeSPAApiBundle:Book")
     */
    public function showAction(Book $book)
    {
        /* @var $seo \Sonata\SeoBundle\Seo\SeoPage */
        $seoPage = $this->get('sonata.seo.page');

        $seoPage
            ->setTitle($book->getTitle())
            ->addMeta('name', 'description', $book->getDescription())
            ->addMeta('property', 'og:title', $book->getTitle())
            ->addMeta('property', 'og:type', 'book')
            ->addMeta('property', 'og:author', $book->getAuthorsAsString())
        ;

        return $this->render('AcmeSPAChaplinBundle::layout.html.twig', array('payload' => $book));
    }
}