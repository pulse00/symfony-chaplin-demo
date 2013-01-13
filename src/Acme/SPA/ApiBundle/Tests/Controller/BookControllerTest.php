<?php
namespace Acme\SPA\ApiBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Testing the POST endpoint using curl:
 *
 *  curl -X POST http://bookstore.local/api/books --data "title=foo&description=bar"
 */
class BookControllerTest extends WebTestCase
{
    public function testPost()
    {
        $client = static::createClient();
        $book = array('title' => 'foo', 'description' => 'bar');
        $client->request('POST', '/api/books', $book);

        $response = $client->getResponse();
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('application/json', $response->headers->get('Content-Type'));

        $result = json_decode($response->getContent(), true);
        $this->assertEquals('foo', $result['title']);
        $this->assertEquals('bar', $result['description']);
    }
}
