<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $searchModel app\models\TripTicketsSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Trip Tickets';
$this->params['breadcrumbs'][] = $this->title;
?>
    <div class="trip-tickets-index">

        <!--        <h1>--><? //= Html::encode($this->title) ?><!--</h1>-->

        <p>
            <?php // Html::a('Create Trip Tickets', ['create'], ['class' => 'btn btn-success']) ?>
        </p>
        <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

        <?php

        $ActionColumn = [
            'class' => 'yii\grid\ActionColumn',
            'template' => '{update} {delete} {link}',
            'buttons' => [
                //                        'update' => function ($url, $ads2) {
                'update' => function ($url, $data) {
                    //                            $model
//                $url = '/admin/update/' . $data['id'];
                    //                            return Html::a('<span class="glyphicon glyphicon-screenshot"></span>', $url);
//                return Html::a('<span class="glyphicon glyphicon-pencil"></span>', $url, [
                    return Html::a('Изменить', '#', [
                        'title' => Yii::t('app', 'Изменить'),
                        'class' => 'link-update'
//                    'data-pjax' => '1',
//                    'data-method' => 'post'
                    ]);
                },
                'delete' => function ($url, $data) {
                    //                    return Html::a('<span class="glyphicon glyphicon-trash"></span>', $url, [
                    return Html::a('Удалить', '#', [
                        'class' => 'link-delete',
                        'data' =>
//                            ['method' => 'post', 'confirm' => 'Вы уверены, что хотите удалить этот элемент?', 'id' => $data['id']]
                            ['id' => $data['id']]
                    ]);
                    //                            Html::a("Выход", ['site/logout'], ['data' => ['method' => 'post'], ['class' => 'white text-center']]);
                },
            ]
        ];
        ?>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalCreate">
            Создать накладную
        </button>

        <?php Pjax::begin(['id' => 'tickets']); ?>
        <?= GridView::widget([
            'dataProvider' => $dataProvider,
            'filterModel' => $searchModel,
            'columns' => [
                ['class' => 'yii\grid\SerialColumn'],
                [
                    'class' => 'yii\grid\CheckboxColumn', 'checkboxOptions' => function ($model) {
                    return ['value' => $model->id];
                },
                ],
                'id',
//            'from_city',
                [
                    'attribute' => 'from_city',
                    'contentOptions' => ['class' => 'count-room', 'data-name' => 'from_city'],
                    'headerOptions' => ['class' => 'count-room'],
                    'label' => 'Откуда',
                ],
//            'to_city',
                [
                    'attribute' => 'to_city',
                    'contentOptions' => ['class' => 'field-name', 'data-name' => 'to_city'],
                    'headerOptions' => ['class' => 'count-room'],
                    'label' => 'Куда',
//                'format' => 'raw',
//                'value' => function ($data) {
//                    return "<span data-name='to_city'>{$data['to_city']}</span>";
//                }
                ],
//            'recipient',
                [
                    'attribute' => 'recipient',
                    'contentOptions' => ['class' => 'field-name', 'data-name' => 'recipient'],
                    'headerOptions' => ['class' => 'count-room'],
                    'label' => 'Получатель',
//                'format' => 'raw',
//                'value' => function ($data) {
//                    return "<span data-name='to_city'>{$data['to_city']}</span>";
//                }
                ],
//            'status',
                [
                    'attribute' => 'status',
                    'contentOptions' => ['class' => 'field-name', 'data-name' => 'status'],
                    'headerOptions' => ['class' => 'count-room'],
                    'label' => 'Статус',
//                'format' => 'raw',
//                'value' => function ($data) {
//                    return "<span data-name='to_city'>{$data['to_city']}</span>";
//                }
                ],

//                ['class' => 'yii\grid\ActionColumn'],
                $ActionColumn
            ],
        ]); ?>

        <?php Pjax::end(); ?>

        <!--        <button id="as21-multi-action" type="button" class="btn btn-danger">Удалить</button>-->
        <?= Html::beginForm('', 'post', ['id' => 'formMultiAction']); ?>
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

        <?php echo $this->render('modal-popup', ['model' => $model, 'popup_id' => 'ModalCreate', 'title' => 'Создание накладной']); ?>
        <?php echo $this->render('modal-popup', ['model' => $model, 'popup_id' => 'ModalUpdate', 'title' => 'Изменение накладной']); ?>

    </div>

<?php print_r($_POST); ?>