<?php
namespace Acme\SPA\ApiBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="bookstore__book")
 * @ORM\Entity(repositoryClass="Acme\SPA\ApiBundle\Entity\BookRepository")
 *
 * @Serializer\ExclusionPolicy("all")
 */
class Book
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
     * @ORM\Column(name="title", type="string", length=255)
     *
     * @Serializer\Expose()
     * @Serializer\Groups({"bookDetail", "bookList"})
     */
    private $title;

    /**
     * @ORM\Column(name="description", type="string", length=255)
     *
     * @Serializer\Expose()
     * @Serializer\Groups({"bookDetail", "bookList"})
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity="Author", inversedBy="books")
     * @ORM\JoinTable(name="bookstore__book_author")
     *
     * @Serializer\Expose()
     * @Serializer\Groups({"bookDetail", "bookList"})
     */
    private $authors;

    public function __construct()
    {
        $this->authors = new ArrayCollection();
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
     * Set title
     *
     * @param string $title
     * @return Book
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Book
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    public function getAuthors()
    {
        return $this->authors;
    }

    public function getAuthorsAsString()
    {
        $authors = array();
        foreach ($this->authors as $author) {
            $authors[] = $author->getFirstname() . ' ' . $author->getLastname();
        }

        return implode(',', $authors);
    }

    public function setAuthors($authors)
    {
        $this->authors = $authors;

        return $this;
    }

    /**
     * @param Author $author
     * @return \Acme\SPA\ApiBundle\Entity\Book
     */
    public function addAuthor(Author $author)
    {
        $this->authors[] = $author;

        return $this;
    }
}
