<?php

namespace Ids\Andreani\Model\ResourceModel;

/**
 * Class CodigoPostal
 *
 * @description ResourceModel para la tabla CodigoPostal
 * @author Mauro Maximiliano Martinez <mmartinez@ids.net.ar>
 * @package Ids\Andreani\Model\ResourceModel
 */
class CodigoPostal extends \Magento\Framework\Model\ResourceModel\Db\AbstractDb
{
    /**
     * Construct
     *
     * @param \Magento\Framework\Model\ResourceModel\Db\Context $context
     * @param string|null $resourcePrefix
     */
    public function __construct(
        \Magento\Framework\Model\ResourceModel\Db\Context $context,
        $resourcePrefix = null
    ) {
        parent::__construct($context, $resourcePrefix);
    }

    public function _construct()
    {
        $this->_init('ids_andreani_codigo_postal','codigo_postal_id');
    }

}