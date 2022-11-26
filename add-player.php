<form id="player-form">

    <div class="form-group row"> 
        <div class="m-2">
            <input type="text" class="form-control" name="playerName" id="playerName" placeholder="Player Name">
        </div>
    </div>

    <div class="form-group row"> 
        <div class="m-2">
            <input type="text" class="form-control" name="playerNumber" id="playerNumber" placeholder="Player Number">
        </div>
    </div>

    <div class="form-group row"> 
        <div class="m-2">
            <select class="form-select" id="playerPosition">
                <option selected value="Player Position">Player Position</option>
                <option value="C">Center</option>
                <option value="W">Wing</option>
                <option value="D">Defense</option>
            </select>
        </div>
    </div>
    
    <div class="form-group row">
        <div class="col-12 col-md-2 m-2">
            <input type="submit" value="Add Player" class="btn btn-primary">
        </div>
    </div>
    
</form>