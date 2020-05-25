<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
?>
lala
<?php Pjax::begin(); ?>
<?= Html::a("Обновить", ['trip-tickets/test-time'], ['class' => 'btn btn-lg btn-primary']);?>
<h1>Сейчас: <?= $time ?></h1>
<?php Pjax::end(); ?>

<?= Html::beginForm('/df', 'get', ['id' => 'formMultiAction']); ?>
<div class="form-group">
    <?php // Html::label('Название поля', 'multiAction', ['class' => 'control-label']) ?>
    <?= Html::dropDownList('multiAction', '', ['1' => 'удалить', '2' => 'изменить'], ['class' => 'form-control',]); ?>
    <!--            <div class="hint-block">Выберите значение</div>-->
</div>
<div class="form-group">
    <!--            --><?php //echo Html::submitButton('Применить', ['id' => 'as21_multi_action', 'class' => 'btn btn-success', 'data-action' => 'update']) ?>
    <?php echo Html::submitButton('Применить', ['id' => 'as21-multi-action', 'class' => 'btn btn-success', 'data-action' => 'update']) ?>
</div>
<?= Html::endForm(); ?>
