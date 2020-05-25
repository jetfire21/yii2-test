<?php

namespace app\controllers;

use Yii;
use app\models\TripTickets;
use app\models\TripTicketsSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * TripTicketsController implements the CRUD actions for TripTickets model.
 */
class TripTicketsController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all TripTickets models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new TripTicketsSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        // as21
        $model = new TripTickets();
        /*
                if (Yii::$app->request->isPjax) {

        //            var_dump(Yii::$app->request->isPjax);
        //            var_dump(Yii::$app->request->post());
        //            echo 'pjax';
                    $model->load(Yii::$app->request->post());
                    $model->save();

                }*/


        if ($model->load(Yii::$app->request->post()) && $model->save()) {
//            return $this->redirect(['view', 'id' => $model->id]);
//            echo 'test777';
//            var_dump($_POST);
        }

        if (Yii::$app->request->post()) {
//            print_r($_POST);
            $showAll = Yii::$app->request->post()['all'] ?? false;
            if ($showAll) {
//                $data = TripTickets::find()->orderBy(['id' => SORT_DESC]);
                $data = TripTickets::find()->orderBy(['id' => SORT_DESC])->asArray()->all();
//                print_r($data);
//            $data = 1;
                return $json = json_encode([
                    'data' => $data,
                    'error' => false
                ], JSON_UNESCAPED_UNICODE);
            }
        }
        // as21

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
            'model' => $model
        ]);
    }

    /**
     * Displays a single TripTickets model.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new TripTickets model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new TripTickets();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing TripTickets model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
//            return $this->redirect(['view', 'id' => $model->id]);
//            var_dump($model);
//            print_r(Yii::$app->request->post());
            $r = Yii::$app->request->post()['TripTickets'];
//            print_r($t);
//            exit;
            return $json = json_encode([
                'data' => $r,
                'error' => false
            ], JSON_UNESCAPED_UNICODE);
        }
        if (Yii::$app->request->isAjax) {
            return $this->renderAjax('_form', [
                'model' => $model,
                'popup_id' => 'ModalUpdate'
            ]);
        }
        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing TripTickets model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();
        if (Yii::$app->request->post()) {
            return $json = json_encode([
                'data' => null,
                'error' => false
            ]);
        }
        return $this->redirect(['index']);
    }

    public function actionMultiDelete()
    {
//        echo 'md';
        if (Yii::$app->request->post()) {
            $chboxs = Yii::$app->request->post()['selection'];

//            var_dump($chboxs);
            $res = \Yii::$app
                ->db
                ->createCommand()
                ->delete('trip_tickets', ['id' => $chboxs])
                ->execute();
//            var_dump($res);
            $data['ids'] = $chboxs;
//            if ($res > 0) {
            return $json = json_encode([
                'data' => $data,
                'error' => false
            ], JSON_UNESCAPED_UNICODE);
//            }
        } else {
            return $json = json_encode([
                'data' => false,
                'error' => true
            ], JSON_UNESCAPED_UNICODE);
//            }
        }


//        return $this->redirect(['index']);
    }


    /**
     * Finds the TripTickets model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return TripTickets the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = TripTickets::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

    public function actionTestTime()
    {
        $time = date('H:i:s');
        return $this->render('test-time', ['time' => $time]);
    }
}
