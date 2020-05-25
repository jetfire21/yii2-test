<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $model app\models\TripTickets */
/* @var $form yii\widgets\ActiveForm */
?>

    <div class="trip-tickets-form">
        <?php
        $action = $action ?? '';
        if (isset($action)) var_dump($action);
        if (isset($form_id)) var_dump($form_id);
        //    'popup_id' => 'ModalCreate']
        ?>
        <?php if ($popup_id == 'ModalCreate') Pjax::begin(['id' => 'new_tickets']); ?>
        <?php // Pjax::begin(['id' => 'new_tickets']); ?>
        <?php $form = ActiveForm::begin(
            [
//                'action' => ['site/index'],
//                'action' => $action,
                'options' =>
                    [
                        'data-id' => '',
//            'class' => 'form-horizontal',
                        'data-pjax' => true,
                    ]
            ]
        ); ?>

        <?= $form->field($model, 'from_city')->textInput(['maxlength' => true, 'class' => 'form-control from_city']) ?>

        <?= $form->field($model, 'to_city')->textInput(['maxlength' => true, 'class' => 'form-control to_city']) ?>

        <?= $form->field($model, 'recipient')->textInput(['maxlength' => true, 'class' => 'form-control recipient']) ?>

        <?= $form->field($model, 'status')->textInput(['class' => 'form-control status']) ?>

        <div class="form-group">
            <?= Html::submitButton('Сохранить', ['class' => 'btn btn-success']) ?>
        </div>

        <?php ActiveForm::end(); ?>
        <?php //Pjax::end(); ?>
        <?php if ($popup_id == 'ModalCreate') Pjax::end(); ?>
    </div>
<?php
