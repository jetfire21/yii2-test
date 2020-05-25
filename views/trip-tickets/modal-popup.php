<!-- Modal -->
<div class="modal fade" id="<?= $popup_id ?>" tabindex="-1" role="dialog" aria-labelledby="<?= $popup_id ?>Label">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="<?= $popup_id ?>Label"><?= $title?></h4>
            </div>
            <div class="modal-body">
                <div class="trip-tickets-create">

                    <?= $this->render('_form', [
                        'model' => $model,
                        'popup_id' => $popup_id,
//                        'title' => $title
                    ]) ?>

                </div>
            </div>
            <!--
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    -->
        </div>
    </div>
</div>