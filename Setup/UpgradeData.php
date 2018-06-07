<?php

namespace Ids\Andreani\Setup;

use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\UpgradeDataInterface;
use Magento\Eav\Setup\EavSetupFactory;

/**
 * Class UpgradeData
 *
 * @description Actualizador de datos para las tablas
 * @author Mauro Maximiliano Martinez <mmartinez@ids.net.ar>
 * @package Ids\Andreani\Setup
 */
class UpgradeData implements UpgradeDataInterface
{
    /**
     * @var EavSetupFactory
     */
    private $_eavSetupFactory;

    /**
     * InstallData constructor.
     * @param EavSetupFactory $eavSetupFactory
     */
    public function __construct(EavSetupFactory $eavSetupFactory)
    {
        $this->_eavSetupFactory = $eavSetupFactory;
    }

    /**
     * Upgrades data for a module
     *
     * @param ModuleDataSetupInterface $setup
     * @param ModuleContextInterface $context
     * @return void
     * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
     */
    public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();

        $eavSetup = $this->_eavSetupFactory->create(['setup' => $setup]);

        if (version_compare($context->getVersion(), '1.0.2', '<'))
        {
            $eavSetup->updateAttribute(\Magento\Catalog\Model\Product::ENTITY,'volumen','apply_to','simple');
        }

        if (version_compare($context->getVersion(), '1.0.3', '<'))
        {
            $eavSetup->updateAttribute(\Magento\Customer\Api\AddressMetadataInterface::ENTITY_TYPE_ADDRESS,'dni','validate_rules','{"max_text_length":15,"min_text_length":7}');
            $eavSetup->updateAttribute(\Magento\Customer\Api\AddressMetadataInterface::ENTITY_TYPE_ADDRESS,'celular','validate_rules','{"max_text_length":20}');
            $eavSetup->updateAttribute(\Magento\Customer\Api\AddressMetadataInterface::ENTITY_TYPE_ADDRESS,'altura','validate_rules','{"min_text_length":1}');
        }

        $setup->endSetup();
    }
}
