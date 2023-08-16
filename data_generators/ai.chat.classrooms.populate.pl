#!/usr/bin/perl

my @teachers = ("jim_thomason", "jim_thomason", "bob_teacherman", "bob_teacherman", "carolyn_musicteacher", "carolyn_musicteacher");
my @classrooms = ("Classroom A", "Classroom B", "Classroom C", "Classroom D", "Classroom E", "Classroom F");

my $curl = qq{curl --location --request POST 'http://localhost:3000/api/classroom' --header 'Accept: */*' --header 'Content-Type: application/json' --data-raw '{ "teacher": "TEACHER", "name": "NAME", "students" : [STUDENTS] }'};

my @students = ();
my $teacher = shift @teachers;
my $classroom = shift @classrooms;

while (<DATA>) {
  chomp;
  my $name = $_;
  my $username = $name;
  $username = lc $name;
  $username =~ s/\W/_/g;
  push @students, $username;
  if (@students == 14) {

    #print $name, $username;
    my $local_curl = $curl;
    $local_curl =~ s/TEACHER/$teacher/g;
    $local_curl =~ s/NAME/$classroom/g;
    $local_curl =~ s/STUDENTS/join(',', map {qq[{"name" : "$_"}]} @students)/ge;

    print $local_curl, "\n";
    @students = ();
    $teacher = shift @teachers;
    $classroom = shift @classrooms;

  }

}

__DATA__
Dianna Mills
Byron Payne
Arnulfo Ayers
Rashad Beck
Irvin Gillespie
Jasmine Anderson
Genaro Henson
Morgan Carlson
Miranda Stuart
Kristine Woods
Keri Burnett
Dwight Marsh
Forrest Griffith
Wes Mckee
Ismael Rasmussen
Maryellen Flowers
Earnestine Phelps
Buster Chaney
Stacey Joseph
Daryl Blackwell
Davis Duffy
Dane Gutierrez
Lesa Williams
Rob Lutz
Myron Sampson
Shon Mejia
Dexter Long
Stefanie Combs
Anita Welch
Cole Wilson
Minerva Brooks
Leola Burch
Christopher Carpenter
Kenneth Jacobs
Kristi Heath
Lewis Webb
Geraldine Macdonald
Colin Davies
Alisha Green
Della Olson
Elinor Stevens
Ophelia Beck
Annabelle Roach
Clint Whitaker
Caleb Gaines
Alison Sexton
Rosendo Mcgee
Colette Stein
Jesse Flores
Morton Rose
Tammi Haley
Adrienne Shields
Gladys Stout
Efren Dorsey
Noelle Christian
Sally Dean
Delores Reeves
Fern Horn
Kirsten Durham
Terrell Blair
Leonard Wilkerson
Blaine Ware
Ashlee Terry
Alan Brock
Elinor Mcintyre
Ronnie Brewer
Ida Zimmerman
Jerome Buchanan
Garfield Stein
Jeffery Padilla
Jorge Osborn
Crystal Davies
Morris Graham
Elena Le
Virgilio Bradley
Dallas Macdonald
Santiago Stevens
Manual Cook
Trey Cohen
Kris Keller
Kayla Li
Chong Rojas
Rico Gillespie
Jana Huang
