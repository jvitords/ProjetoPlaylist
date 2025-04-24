package com.projetoplaylist.configuration;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;

import com.projetoplaylist.entities.Music;
import com.projetoplaylist.entities.Playlist;
import com.projetoplaylist.repository.MusicRepository;
import com.projetoplaylist.repository.PlaylistRepository;

@org.springframework.context.annotation.Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner{

	@Autowired
	PlaylistRepository playlistRepository;
	@Autowired
	MusicRepository musicRepository;

	@Override
	public void run(String... args) throws Exception {
		
		Playlist p1 = new Playlist(null, "Funk RJ", "Funk");
		Playlist p2 = new Playlist(null, "Jorge e Matheus", "Sertanejo");
		Playlist p3 = new Playlist(null, "Melhores do Pixote", "Pagode");
		playlistRepository.saveAll(Arrays.asList(p1,p2,p3));
		
		Music m1 = new Music(null, "Flor e o Beija-Flor", "Jorge e Matheus");
		Music m2 = new Music(null, "Saudade arregaça", "Pixote");
		Music m3 = new Music(null, "Freio da Blazer", "MC Cabelinho");
		musicRepository.saveAll(Arrays.asList(m1,m2,m3));

	}

}
