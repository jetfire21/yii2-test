<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "trip_tickets".
 *
 * @property int $id
 * @property string $from_city
 * @property string $to_city
 * @property string $recipient
 * @property int $status
 */
class TripTickets extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'trip_tickets';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['from_city', 'to_city', 'recipient', 'status'], 'required'],
            [['status'], 'integer'],
            [['from_city', 'to_city', 'recipient'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'from_city' => 'Откуда',
            'to_city' => 'Куда',
            'recipient' => 'Получатель',
            'status' => 'Статус',
        ];
    }
}
