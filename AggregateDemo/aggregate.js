db.persons.aggregate([{$match : {gender : "male"}}])

// Get the male count from each state
db.persons.aggregate([
    {$match : {gender : "male"}},
    {$group : {_id : {state : "$location.state"}, total : {$sum : 1}}}
]).pretty()

// Get the male count from each state in sorted way
db.persons.aggregate([
    {$match : {gender : "male"}},
    {$group : {_id : {state : "$location.state"}, total : {$sum : 1}}},
    {$sort : {total : -1}}
]).pretty()

// Cocncat String
db.persons.aggregate([
    {$project : {_id : 0, gender : 1, fullName : {
        $concat : ["Brain", " ", "Mentors"]
    }}}
])

db.persons.aggregate([
    {$project : {_id : 0, gender : 1, fullName : {
        $concat : ["$name.title"," ","$name.first"," ", "$name.last"]
    }}}
])

// String Upper Case
db.persons.aggregate([
    {$project : {
        _id : 0,
        gender : 1, 
        fullName : {
            $concat : [
                {$toUpper : "$name.title"},
                ' ',
                {$toUpper : "$name.first"},
                ' ',
                {$toUpper : "$name.last"}
            ]
        }
    }
}]).pretty()

// String Title
db.persons.aggregate([
    {$project : {
        _id : 0,
        gender : 1, 
        fullName : {
            $concat : [
                {$toUpper : {$substrCP : ["$name.title", 0, 1]}},
                {
                    $substrCP : [
                        "$name.title",
                         1, 
                         {$subtract : [{$strLenCP : "$name.title"},1]}
                        ]
                    },
                ' ',
                {$toUpper : {$substrCP : ["$name.first", 0, 1]}},
                {
                    $substrCP : [
                        "$name.first",
                         1, 
                         {$subtract : [{$strLenCP : "$name.first"},1]}
                        ]
                    },
                ' ',
                {$toUpper : {$substrCP : ["$name.last", 0, 1]}},
                {
                    $substrCP : [
                        "$name.last",
                         1, 
                         {$subtract : [{$strLenCP : "$name.last"},1]}
                        ]
                    }
            ]
        }
    }
}]).pretty()


db.persons.aggregate([

    {
        $project : {
            _id : 0,
            name : 1,
            email : 1,
            location : {
                coordinates : [
                    "$location.coordinates.latitude",
                    "$location.coordinates.longitude"
                ]
            }
        }
    },

    {$project : {
        _id : 0,
        gender : 1, 
        location : 1,
        email : 1,
        fullName : {
            $concat : [
                {$toUpper : {$substrCP : ["$name.title", 0, 1]}},
                {
                    $substrCP : [
                        "$name.title",
                         1, 
                         {$subtract : [{$strLenCP : "$name.title"},1]}
                        ]
                    },
                ' ',
                {$toUpper : {$substrCP : ["$name.first", 0, 1]}},
                {
                    $substrCP : [
                        "$name.first",
                         1, 
                         {$subtract : [{$strLenCP : "$name.first"},1]}
                        ]
                    },
                ' ',
                {$toUpper : {$substrCP : ["$name.last", 0, 1]}},
                {
                    $substrCP : [
                        "$name.last",
                         1, 
                         {$subtract : [{$strLenCP : "$name.last"},1]}
                        ]
                    }
            ]
        }
    }
}]).pretty()



// Type casting
db.persons.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            email : 1,
            location : {
                coordinates : [
                    {
                        $convert : {
                            input : "$location.coordinates.latitude",
                            to : "double",
                            onError : 0.0,
                            onNull : 0.0
                        }
                    },
                    {
                        $convert : {
                            input : "$location.coordinates.longitude",
                            to : "double",
                            onError : 0.0,
                            onNull : 0.0
                        }
                    }
                ]
            }
        }
    },

    {$project : {
        _id : 0,
        gender : 1, 
        location : 1,
        email : 1,
        fullName : {
            $concat : [
                {$toUpper : {$substrCP : ["$name.title", 0, 1]}},
                {
                    $substrCP : [
                        "$name.title",
                         1, 
                         {$subtract : [{$strLenCP : "$name.title"},1]}
                        ]
                    },
                ' ',
                {$toUpper : {$substrCP : ["$name.first", 0, 1]}},
                {
                    $substrCP : [
                        "$name.first",
                         1, 
                         {$subtract : [{$strLenCP : "$name.first"},1]}
                        ]
                    },
                ' ',
                {$toUpper : {$substrCP : ["$name.last", 0, 1]}},
                {
                    $substrCP : [
                        "$name.last",
                         1, 
                         {$subtract : [{$strLenCP : "$name.last"},1]}
                        ]
                    }
            ]
        }
    }
}]).pretty()


// Working on date
db.persons.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            email : 1,
            birthDate : {
                $convert : {
                    input : "$dob.date", to : "date"
                }
            },
            age : "$dob.age",
            location : {
                coordinates : [
                    {
                        $convert : {
                            input : "$location.coordinates.latitude",
                            to : "double",
                            onError : 0.0,
                            onNull : 0.0
                        }
                    },
                    {
                        $convert : {
                            input : "$location.coordinates.longitude",
                            to : "double",
                            onError : 0.0,
                            onNull : 0.0
                        }
                    }
                ]
            }
        }
    },

    {$project : {
        _id : 0,
        gender : 1, 
        location : 1,
        birthDate : 1,
        age : 1,
        email : 1,
        fullName : {
            $concat : [
                {$toUpper : {$substrCP : ["$name.title", 0, 1]}},
                {
                    $substrCP : [
                        "$name.title",
                         1, 
                         {$subtract : [{$strLenCP : "$name.title"},1]}
                        ]
                    },
                ' ',
                {$toUpper : {$substrCP : ["$name.first", 0, 1]}},
                {
                    $substrCP : [
                        "$name.first",
                         1, 
                         {$subtract : [{$strLenCP : "$name.first"},1]}
                        ]
                    },
                ' ',
                {$toUpper : {$substrCP : ["$name.last", 0, 1]}},
                {
                    $substrCP : [
                        "$name.last",
                         1, 
                         {$subtract : [{$strLenCP : "$name.last"},1]}
                        ]
                    }
            ]
        }
    }
}]).pretty()

// Working with date with shortcut transformation
db.persons.aggregate([
    {
        $project : {
            _id : 0,
            name : 1,
            email : 1,
            birthDate : {
                $toDate : "$dob.date"
            },
            age : "$dob.age",
            location : {
                coordinates : [
                    {
                        $convert : {
                            input : "$location.coordinates.latitude",
                            to : "double",
                            onError : 0.0,
                            onNull : 0.0
                        }
                    },
                    {
                        $convert : {
                            input : "$location.coordinates.longitude",
                            to : "double",
                            onError : 0.0,
                            onNull : 0.0
                        }
                    }
                ]
            }
        }
    },

    {$project : {
        _id : 0,
        gender : 1, 
        location : 1,
        birthDate : 1,
        age : 1,
        email : 1,
        fullName : {
            $concat : [
                {$toUpper : {$substrCP : ["$name.title", 0, 1]}},
                {
                    $substrCP : [
                        "$name.title",
                         1, 
                         {$subtract : [{$strLenCP : "$name.title"},1]}
                        ]
                    },
                ' ',
                {$toUpper : {$substrCP : ["$name.first", 0, 1]}},
                {
                    $substrCP : [
                        "$name.first",
                         1, 
                         {$subtract : [{$strLenCP : "$name.first"},1]}
                        ]
                    },
                ' ',
                {$toUpper : {$substrCP : ["$name.last", 0, 1]}},
                {
                    $substrCP : [
                        "$name.last",
                         1, 
                         {$subtract : [{$strLenCP : "$name.last"},1]}
                        ]
                    }
            ]
        }
    }
}]).pretty()