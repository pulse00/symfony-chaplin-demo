<?php
namespace Acme\SPA\ChaplinBundle\Security;

use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\OAuthServerBundle\Entity\TokenManager;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Acme\SPA\ApiBundle\Entity\OAuth\AccessToken;

class AuthenticationSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    /**
     * @var RegistryInterface
     */
    protected $doctrine;

    /**
     * @param RegistryInterface $doctrine
     */
    public function __construct(RegistryInterface $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    /**
     * {@inheritdoc}
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        $oauthToken = $this->getOrCreateAccessToken($token);
        $response = new JsonResponse(array(
            'username' => $token->getUsername(),
            'token' => $oauthToken->getToken()
        ));

        return $response;
    }

    /**
     * @param TokenInterface $token
     */
    protected function getOrCreateAccessToken(TokenInterface $token)
    {
        $user = $token->getUser();
        $tokenManager = new TokenManager($this->doctrine->getEntityManager(), 'Acme\SPA\ApiBundle\Entity\OAuth\AccessToken');
        $oauthToken = $tokenManager->findTokenBy(array('user' => $token->getUser()));

        if (!$oauthToken instanceof AccessToken) {
            // id 1 is our chaplin client
            $chaplinClient = $this->doctrine->getRepository('AcmeSPAApiBundle:Oauth2/Client')->find(1);
            $oauthToken = $tokenManager->createToken();
            // TODO: create a more sophisticated access token
            $oauthToken->setToken(uniqid());
            $oauthToken->setClient($chaplinClient);
            $oauthToken->setUser($user);
            $oauthToken->updateToken($token);
        }

        return $oauthToken;
    }
}
