<?php
namespace Acme\SPA\ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="bookstore__author")
 * @ORM\Entity(repositoryClass="Acme\SPA\ApiBundle\Entity\AuthorRepository")
 *
 * @Serializer\ExclusionPolicy("all")
 */
class Author
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @Serializer\Expose()
     * @Serializer\Groups({"bookDetail", "bookList"})
     */
    private $id;

    /**
     * @ORM\Column(name="firstname", type="string", length=255)
     *
     * @Serializer\Expose()
     * @Serializer\Groups({"bookDetail", "bookList"})
     */
    private $firstname;

    /**
     * @ORM\Column(name="lastname", type="string", length=255)
     *
     * @Serializer\Expose()
     * @Serializer\Groups({"bookDetail", "bookList"})
     */
    private $lastname;

    /**
     * @ORM\ManyToMany(targetEntity="Book", mappedBy="authors")
     *
     * @Serializer\Expose()
     * @Serializer\Groups({"authorDetail"})
     **/
    private $books;

    public function __construct()
    {
        $this->books =  new ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set firstname
     *
     * @param string $firstname
     * @return Author
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get firstname
     *
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname
     *
     * @param string $lastname
     * @return Author
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname
     *
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    public function getBooks()
    {
        return $this->books;
    }

    public function setBooks($books)
    {
        $this->books = $books;
        return $this;
    }

}
