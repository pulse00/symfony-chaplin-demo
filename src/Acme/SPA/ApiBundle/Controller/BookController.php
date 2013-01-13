<?php
namespace Acme\SPA\ApiBundle\Controller;

use Acme\SPA\ApiBundle\Form\Type\BookType;
use Acme\SPA\ApiBundle\Entity\Book;

use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Routing\ClassResourceInterface;

use JMS\DiExtraBundle\Annotation\Inject;
use JMS\SecurityExtraBundle\Annotation\PreAuthorize;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;


class BookController implements ClassResourceInterface
{
    /**
     * @Inject("doctrine")
     */
    protected $doctrine;

    /**
     * @Inject("form.factory")
     */
    protected $formFactory;

    /**
     * @Inject("request")
     */
    protected $request;

    /**
     * @Inject("jms_serializer")
     */
    protected $serializer;

    /**
     * @Rest\View(serializerGroups={"bookList"})
     */
    public function cgetAction()
    {
        return $this
            ->doctrine
            ->getRepository('AcmeSPAApiBundle:Book')
            ->findAll()
        ;
    }

    /**
     * @Rest\View(serializerGroups={"bookDetail"})
     * @ParamConverter("id", class="AcmeSPAApiBundle:Book")
     */
    public function getAction(Book $id)
    {
        return $id;
    }

    /**
     * @PreAuthorize("isFullyAuthenticated()")
     */
    public function cpostAction()
    {
        return $this->processForm(new Book());
    }

    /**
     * @PreAuthorize("isFullyAuthenticated()")
     */
    public function putAction($id)
    {
        $book = $this
            ->doctrine
            ->getRepository('AcmeSPAApiBundle:Book')
            ->find($id)
        ;

        if (!$book instanceof Book) {
            throw new NotFoundHttpException();
        }

        return $this->processForm($book);
    }

    /**
     * @PreAuthorize("isFullyAuthenticated()")
     */
    public function deleteAction($id)
    {
        $book = $this
            ->doctrine
            ->getRepository('AcmeSPAApiBundle:Book')
            ->find($id)
        ;

        if (!$book instanceof Book) {
            throw new NotFoundHttpException();
        }

        $this->doctrine->getEntityManager()->remove($book);
        $this->doctrine->getEntityManager()->flush();

        return new Response();
    }

    /**
     * @param Book $book
     * @return \Symfony\Component\HttpFoundation\Response|\FOS\RestBundle\View\View
     */
    protected function processForm(Book $book)
    {
        $statusCode = $book->getId() > 0 ? 204 : 201;
        $form = $this->formFactory->create(new BookType(), $book);
        $form->bind($this->request);

        if ($form->isValid()) {
            $em = $this->doctrine->getEntityManager();
            $em->persist($book);
            $em->flush();

            $response = new Response();
            $response->setContent($this->serializer->serialize($book, 'json'));
            $response->setStatusCode($statusCode);

            return $response;
        }

        return View::create($form, 400);
    }
}