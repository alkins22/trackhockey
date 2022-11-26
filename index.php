<!DOCTYPE html>
<html lang="en">

<head>
    <?php require_once "head.php"; ?>
    <?php require_once "bootstrap.php"; ?>
</head>

<body>

    <?php require_once "menu.php"; ?>

    <?php require_once "header.php"; ?>

    <div class="container">
        <!-- Welcome Message -->
        <div class="row-content">
            <br>
            <br>
            <h1>Hockey Stats Tracker</h1>
        <!-- Player Input Form -->
        <div class="row">
            
            <div class="col-5">
                <h4>Add a player</h4>
                <?php require_once "add-player.php"; ?>
            </div>
            <div class="col-6 offset-1">
            <h4>Add multiple players</h4>
                <?php require_once "add-multi-player.php"; ?>
            </div>
        </div>

        <div class="row">
                   <!-- Controls -->
                   <div class="mt-5">
                <div class="col-12 col-xs-2 offset-s-8 mb-4" id="controls">
                    <a type="button" value="" data-bs-toggle="tooltip" data-bs-placement="top" title="Play Selected" class="btn btn-success btn-sm fw-bold" id="playerSelected" onclick="playSelected()">
                        <i class="fa-solid fa-play" data-bs-toggle="tooltip" data-bs-placement="top" title="Play Selected"></i>
                    </a>
                    <a type="button" value="" data-bs-toggle="tooltip" data-bs-placement="top" title="Pause All" class="btn btn-warning btn-sm fw-bold" id="pauseAll" onclick="pauseAll()">
                        <i class="fa-solid fa-pause" data-bs-toggle="tooltip" data-bs-placement="top" title="Pause All"></i>
                    </a>
                    <!-- <a type="button" value="" data-bs-toggle="tooltip" data-bs-placement="top" title="Save to Account" class="btn btn-primary btn-sm" >
                        <i class="fas fa-save" data-bs-toggle="tooltip" data-bs-placement="top" title="Save to Account"></i>
                    </a> -->
                    <a type="button" value="" data-bs-toggle="tooltip" data-bs-placement="top" title="Export to CSV" class="btn btn-secondary btn-sm" id="exportExcel" onclick="exportData()">
                        <i class="fa-solid fa-download" data-bs-toggle="tooltip" data-bs-placement="top" title="Export to CSV"></i>
                    </a>
                    <a type="button" value="" data-bs-toggle="tooltip" data-bs-placement="top" title="Clear Stats" class="btn btn-danger btn-sm" onclick="clearAllStats()">
                        <i class="fa-solid fa-redo" data-bs-toggle="tooltip" data-bs-placement="top" title="Clear Stats"></i>
                    </a>
                    <a type="button" value="" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove All Players" class="btn btn-danger btn-sm" onclick="removeAll()" >
                        <i class="fa-solid fa-trash-alt" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove All Players"></i>
                    </a>

        </div>
            

                <!-- Table -->
                <table id="playerTable" class="table table-striped table-hover table-sm ">

                    <!-- Table Head-->
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Number</th>
                            <th scope="col">TOI</th>
                            <th scope="col">+/-</th>
                            <th scope="col">Shots</th>
                            <th scope="col">Hits</th>
                            <th scope="col">Blocks</th>
                            <th scope="col" colspan="3"></th>
                        </tr>
                    </thead>

                    <!-- Table Body-->
                    <tbody id="player-table">
            
                    </tbody>

                    <!-- Table Foot -->
                    <tfoot>
                        <tr>
                            <td colspan="1" class=""><Strong>Totals</Strong></td>
                            <td colspan="4" class=""></td>
                            <td id="totalShots" class="fw-bold" data-label="Total Shots:">0</td>
                            <td  id="totalHits" class="fw-bold" data-label="Total Hits:">0</td>
                            <td  id="totalBlocks" class="fw-bold" data-label="Total Blocks:">0</td>
                            <td colspan="3"></td>
                        </tr>
                    </tfoot>

                </table>
                </div>
            </div>
 
        </div>

    </div>

    <footer class="footer">            
           <div class="container">
               <div class="row">
    
           </div>
    </footer>
    <div class="col-auto align-self-center" id="copyright">
        © Copyright 2021 TrackHockey
    </div> 

    <!-- jQuery first, then Popper.js, then Bootstrap JS. -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>  
    <script src="/node_modules/jquery-csv/src/jquery.csv.js"></script>
    <script src="./tracker.js"></script>
    <script src="/js/export.js"></script>
    <script src="/js/import.js"></script>
    <script src="/js/drag.js"></script>

</body>
</html>