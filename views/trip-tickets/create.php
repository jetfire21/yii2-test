<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\TripTickets */

$this->title = 'Create Trip Tickets';
$this->params['breadcrumbs'][] = ['label' => 'Trip Tickets', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="trip-tickets-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
