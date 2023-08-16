#!/usr/bin/perl

my @teachers =

my $curl = qq{curl --location --request POST 'http://localhost:3000/api/user' --header 'Accept: */*' --header 'Content-Type: application/json' --data-raw '{ "username": "USERNAME", "usertype" :"student", "name": "NAME" }'};

print qq{curl --location --request POST 'http://localhost:3000/api/user' --header 'Accept: */*' --header 'Content-Type: application/json' --data-raw '{ "username": "jim_thomason", "usertype" :"teacher", "name": "Jim Thomason" }'}, "\n";
print qq{curl --location --request POST 'http://localhost:3000/api/user' --header 'Accept: */*' --header 'Content-Type: application/json' --data-raw '{ "username": "bob_teacherman", "usertype" :"teacher", "name": "Bob Teacherman" }'}, "\n";
print qq{curl --location --request POST 'http://localhost:3000/api/user' --header 'Accept: */*' --header 'Content-Type: application/json' --data-raw '{ "username": "carolyn_musicteacher", "usertype" :"teacher", "name": "Carolyn Musicteacher" }'}, "\n";


while (<DATA>) {
  chomp;
  my $name = $_;
  my $username = $name;
  $username = lc $name;
  $username =~ s/\W/_/g;
  #print $name, $username;
  my $local_curl = $curl;
  $local_curl =~ s/USERNAME/$username/g;
  $local_curl =~ s/NAME/$name/g;

  print $local_curl, "\n";
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
Keri Hansen
Kory Hebert
Damion Strong
Homer Vaughn
