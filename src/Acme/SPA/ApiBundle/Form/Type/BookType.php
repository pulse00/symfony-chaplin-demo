<?php
namespace Acme\SPA\ApiBundle\Form\Type;

use Acme\SPA\ApiBundle\Form\Type\ApiType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class BookType extends ApiType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('description')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        parent::setDefaultOptions($resolver);
        $resolver->setDefaults(array(
                'data_class' => 'Acme\SPA\ApiBundle\Entity\Book'
        ));
    }
}
